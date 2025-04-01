import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Modal,
  Spinner,
  InputGroup,
  FormControl,
  Badge,
} from 'react-bootstrap';
import { FaEdit, FaTrash, FaSearch, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ManageWarehouse = () => {
  // State for form data
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    contactName: '',
    typeOfGoods: '',
    storageDuration: '',
    quantity: '',
    specialRequirements: '',
    preferredLocation: '',
    dropOffDate: '',
    pickUpDate: '',
  });

  // State for warehouse requests data
  const [warehouseRequests, setWarehouseRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add New Warehouse Request');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch all warehouse requests from the backend
  useEffect(() => {
    const fetchWarehouseRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/requests');
        const data = await response.json();
        setWarehouseRequests(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching warehouse requests:', error);
        setLoading(false);
      }
    };
    fetchWarehouseRequests();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = formData.id
        ? `http://localhost:5000/api/update-request/${formData.id}`
        : 'http://localhost:5000/api/request-warehouse';
      const method = formData.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (formData.id) {
        // Update existing request
        setWarehouseRequests(warehouseRequests.map(req => 
          req._id === formData.id ? data.data : req
        ));
      } else {
        // Add new request
        setWarehouseRequests([...warehouseRequests, data.data]);
      }

      resetForm();
      setShowModal(false);
      alert(`Warehouse request ${formData.id ? 'updated' : 'added'} successfully!`);
    } catch (error) {
      console.error('Error saving warehouse request:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  // Edit request
  const handleEdit = (request) => {
    setFormData({
      id: request._id,
      name: request.name,
      address: request.address,
      contactName: request.contactName,
      typeOfGoods: request.typeOfGoods,
      storageDuration: request.storageDuration,
      quantity: request.quantity,
      specialRequirements: request.specialRequirements,
      preferredLocation: request.preferredLocation,
      dropOffDate: request.dropOffDate.split('T')[0],
      pickUpDate: request.pickUpDate.split('T')[0],
    });
    setModalTitle('Edit Warehouse Request');
    setShowModal(true);
  };

  // Delete request
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this warehouse request?')) {
      try {
        await fetch(`http://localhost:5000/api/delete-request/${id}`, {
          method: 'DELETE',
        });
        setWarehouseRequests(warehouseRequests.filter(req => req._id !== id));
        alert('Warehouse request deleted successfully!');
      } catch (error) {
        console.error('Error deleting warehouse request:', error);
        alert('An error occurred while deleting the warehouse request.');
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      address: '',
      contactName: '',
      typeOfGoods: '',
      storageDuration: '',
      quantity: '',
      specialRequirements: '',
      preferredLocation: '',
      dropOffDate: '',
      pickUpDate: '',
    });
    setModalTitle('Add New Warehouse Request');
  };

  // Export to CSV
  const exportToCSV = () => {
    const dataToExport = filteredRequests.map((req) => ({
      'Company Name': req.name,
      'Contact Name': req.contactName,
      'Type of Goods': req.typeOfGoods,
      'Storage Duration': req.storageDuration,
      Quantity: req.quantity,
      'Preferred Location': req.preferredLocation,
      'Drop-off Date': new Date(req.dropOffDate).toLocaleDateString(),
      'Pick-up Date': new Date(req.pickUpDate).toLocaleDateString(),
      'Request Date': new Date(req.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'WarehouseRequests');
    XLSX.writeFile(wb, 'warehouse_requests.csv');
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Warehouse Requests Report', 14, 16);
    const headers = [
      ['Company', 'Contact', 'Goods Type', 'Duration', 'Quantity', 'Location', 'Drop-off', 'Pick-up']
    ];
    const data = filteredRequests.map((req) => [
      req.name,
      req.contactName,
      req.typeOfGoods,
      req.storageDuration,
      req.quantity,
      req.preferredLocation,
      new Date(req.dropOffDate).toLocaleDateString(),
      new Date(req.pickUpDate).toLocaleDateString(),
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
      styles: { fontSize: 8 },
    });
    doc.save('warehouse_requests_report.pdf');
  };

  // Filter requests based on search term
  const filteredRequests = warehouseRequests.filter(
    (req) =>
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.typeOfGoods.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.preferredLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // Status badge color
  const getStatusBadge = (dropOffDate, pickUpDate) => {
    const today = new Date();
    const dropOff = new Date(dropOffDate);
    const pickUp = new Date(pickUpDate);

    if (today < dropOff) return 'primary'; // Pending
    if (today >= dropOff && today <= pickUp) return 'success'; // Active
    return 'secondary'; // Completed
  };

  // Status text
  const getStatusText = (dropOffDate, pickUpDate) => {
    const today = new Date();
    const dropOff = new Date(dropOffDate);
    const pickUp = new Date(pickUpDate);

    if (today < dropOff) return 'Pending';
    if (today >= dropOff && today <= pickUp) return 'Active';
    return 'Completed';
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h4>Manage Warehouse Requests</h4>
              <div>
                <Button variant="light" onClick={() => setShowModal(true)}>
                  Add New Request
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {/* Search and Export Controls */}
              <Row className="mb-3">
                <Col md={6}>
                  <InputGroup>
                    <FormControl
                      placeholder="Search by company, contact, goods type or location"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <InputGroup.Text>
                      <FaSearch />
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col md={6} className="d-flex justify-content-end">
                  <Button variant="success" className="me-2" onClick={exportToCSV}>
                    <FaFileExcel className="me-1" /> Export CSV
                  </Button>
                  <Button variant="danger" onClick={exportToPDF}>
                    <FaFilePdf className="me-1" /> Export PDF
                  </Button>
                </Col>
              </Row>
              {/* Warehouse Requests Table */}
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Goods Type</th>
                        <th>Duration</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((req, index) => (
                          <tr key={req._id}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{req.name}</td>
                            <td>{req.contactName}</td>
                            <td>{req.typeOfGoods}</td>
                            <td>{req.storageDuration}</td>
                            <td>{req.quantity}</td>
                            <td>{req.preferredLocation}</td>
                            <td>
                              <Badge bg={getStatusBadge(req.dropOffDate, req.pickUpDate)}>
                                {getStatusText(req.dropOffDate, req.pickUpDate)}
                              </Badge>
                            </td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => handleEdit(req)}
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(req._id)}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">No warehouse requests found</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  {/* Pagination */}
                  {filteredRequests.length > itemsPerPage && (
                    <div className="d-flex justify-content-center">
                      <nav>
                        <ul className="pagination">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(currentPage - 1)}
                            >
                              Previous
                            </button>
                          </li>
                          {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage(i + 1)}
                              >
                                {i + 1}
                              </button>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(currentPage + 1)}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter company name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter contact name"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Company Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter company address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Type of Goods</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter type of goods"
                    name="typeOfGoods"
                    value={formData.typeOfGoods}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Storage Duration</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., 3 months"
                    name="storageDuration"
                    value={formData.storageDuration}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter preferred location"
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Special Requirements</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter any special requirements"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Drop-off Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="dropOffDate"
                    value={formData.dropOffDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Pick-up Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="pickUpDate"
                    value={formData.pickUpDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                {formData.id ? 'Update Request' : 'Submit Request'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageWarehouse;