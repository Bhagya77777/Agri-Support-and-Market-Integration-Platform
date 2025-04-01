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
  Alert,
} from 'react-bootstrap';
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFileExcel,
  FaFilePdf,
  FaTruck,
  FaBoxes,
  FaIceCream,
  FaTemperatureLow,
  FaInfoCircle,
} from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const DeliveryTrack = () => {
  // State for form data
  const [formData, setFormData] = useState({
    _id: '',
    orderId: '',
    deliveryAddress: '',
    contactNumber: '',
    refrigeratedPacking: false,
    insulatedPacking: false,
    customPacking: false,
    specialInstructions: '',
    isBulkOrder: false,
    bulkOrderId: '',
    bulkDeliveryAddress: '',
    bulkContactNumber: '',
    bulkOrderWeight: '',
    preferredPacking: 'standard',
    preferredVehicleType: 'small',
  });

  // State for delivery orders data
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Create New Delivery Order');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all delivery orders from the backend
  useEffect(() => {
    const fetchDeliveryOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get-delivery-orders');
        const data = await response.json();
        setDeliveryOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching delivery orders:', error);
        setError('Failed to load delivery orders. Please try again later.');
        setLoading(false);
      }
    };
    fetchDeliveryOrders();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      let response;
      if (isEditing) {
        // Update existing order
        response = await fetch(`http://localhost:5000/api/update-delivery-order/${formData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new order
        response = await fetch('http://localhost:5000/api/create-delivery-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to process delivery order');
      }

      if (isEditing) {
        // Update the existing order in the list
        setDeliveryOrders(deliveryOrders.map(order => 
          order._id === formData._id ? data.data : order
        ));
        setSuccess('Delivery order updated successfully!');
      } else {
        // Add the new order to the list
        setDeliveryOrders([...deliveryOrders, data.data]);
        setSuccess('Delivery order created successfully!');
      }
      
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error processing delivery order:', error);
      setError(error.message || 'An error occurred. Please try again later.');
    }
  };

  // Delete delivery order
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this delivery order?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/delete-delivery-order/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete delivery order');
        }

        setDeliveryOrders(deliveryOrders.filter((order) => order._id !== id));
        setSuccess('Delivery order deleted successfully!');
      } catch (error) {
        console.error('Error deleting delivery order:', error);
        setError(error.message || 'An error occurred while deleting the order.');
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      _id: '',
      orderId: '',
      deliveryAddress: '',
      contactNumber: '',
      refrigeratedPacking: false,
      insulatedPacking: false,
      customPacking: false,
      specialInstructions: '',
      isBulkOrder: false,
      bulkOrderId: '',
      bulkDeliveryAddress: '',
      bulkContactNumber: '',
      bulkOrderWeight: '',
      preferredPacking: 'standard',
      preferredVehicleType: 'small',
    });
    setModalTitle('Create New Delivery Order');
    setIsEditing(false);
    setError(null);
  };

  // Export to CSV
  const exportToCSV = () => {
    const dataToExport = filteredOrders.map((order) => ({
      'Order ID': order.orderId,
      'Delivery Address': order.deliveryAddress,
      'Contact Number': order.contactNumber,
      'Packing Type': order.preferredPacking,
      'Vehicle Type': order.preferredVehicleType,
      'Bulk Order': order.isBulkOrder ? 'Yes' : 'No',
      'Created Date': new Date(order.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'DeliveryOrders');
    XLSX.writeFile(wb, 'delivery_orders.csv');
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Delivery Orders Report', 14, 16);
    const headers = [
      ['Order ID', 'Delivery Address', 'Contact', 'Packing', 'Vehicle', 'Bulk', 'Created Date'],
    ];
    const data = filteredOrders.map((order) => [
      order.orderId,
      order.deliveryAddress,
      order.contactNumber,
      order.preferredPacking,
      order.preferredVehicleType,
      order.isBulkOrder ? 'Yes' : 'No',
      new Date(order.createdAt).toLocaleDateString(),
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
      styles: { fontSize: 8 },
    });
    doc.save('delivery_orders_report.pdf');
  };

  // Filter orders based on search term
  const filteredOrders = deliveryOrders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.contactNumber.includes(searchTerm) ||
      (order.isBulkOrder && 'bulk'.includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Get badge color based on packing type
  const getPackingBadge = (packing) => {
    switch (packing) {
      case 'refrigerated':
        return 'info';
      case 'insulated':
        return 'warning';
      case 'custom':
        return 'danger';
      default:
        return 'primary';
    }
  };

  // Get badge color based on vehicle type
  const getVehicleBadge = (vehicle) => {
    switch (vehicle) {
      case 'large':
        return 'danger';
      case 'medium':
        return 'warning';
      default:
        return 'success';
    }
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h4>
                <FaTruck className="me-2" />
                Delivery Tracking
              </h4>
             
            </Card.Header>
            <Card.Body>
              {/* Alerts for success/error messages */}
              {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
                  {success}
                </Alert>
              )}

              {/* Search and Export Controls */}
              <Row className="mb-3">
                <Col md={6}>
                  <InputGroup>
                    <FormControl
                      placeholder="Search by order ID, address, or contact"
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

              {/* Delivery Orders Table */}
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
                        <th>Order ID</th>
                        <th>Delivery Address</th>
                        <th>Contact</th>
                        <th>Packing</th>
                        <th>Vehicle</th>
                        <th>Bulk</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((order, index) => (
                          <tr key={order._id}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{order.orderId}</td>
                            <td>{order.deliveryAddress}</td>
                            <td>{order.contactNumber}</td>
                            <td>
                              <Badge
                                bg={getPackingBadge(order.preferredPacking)}
                                className="text-capitalize"
                              >
                                {order.preferredPacking}
                                {order.refrigeratedPacking && <FaIceCream className="ms-1" />}
                                {order.insulatedPacking && <FaTemperatureLow className="ms-1" />}
                                {order.customPacking && <FaInfoCircle className="ms-1" />}
                              </Badge>
                            </td>
                            <td>
                              <Badge
                                bg={getVehicleBadge(order.preferredVehicleType)}
                                className="text-capitalize"
                              >
                                {order.preferredVehicleType}
                              </Badge>
                            </td>
                            <td>
                              {order.isBulkOrder ? (
                                <Badge bg="dark">
                                  <FaBoxes className="me-1" />
                                  {order.bulkOrderWeight} kg
                                </Badge>
                              ) : (
                                <Badge bg="secondary">Regular</Badge>
                              )}
                            </td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => {
                                  setFormData({
                                    ...order,
                                    isBulkOrder: order.isBulkOrder || false,
                                  });
                                  setModalTitle('Edit Delivery Order');
                                  setIsEditing(true);
                                  setShowModal(true);
                                }}
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(order._id)}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No delivery orders found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>

                  {/* Pagination */}
                  {filteredOrders.length > itemsPerPage && (
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
                            <li
                              key={i}
                              className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                            >
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage(i + 1)}
                              >
                                {i + 1}
                              </button>
                            </li>
                          ))}
                          <li
                            className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                          >
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

      {/* Create/Edit Modal */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          resetForm();
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Order ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter order ID"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter contact number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter delivery address"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Packing</Form.Label>
                  <Form.Select
                    name="preferredPacking"
                    value={formData.preferredPacking}
                    onChange={handleChange}
                    required
                  >
                    <option value="standard">Standard</option>
                    <option value="refrigerated">Refrigerated</option>
                    <option value="insulated">Insulated</option>
                    <option value="custom">Custom</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Vehicle Type</Form.Label>
                  <Form.Select
                    name="preferredVehicleType"
                    value={formData.preferredVehicleType}
                    onChange={handleChange}
                    required
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="This is a bulk order"
                name="isBulkOrder"
                checked={formData.isBulkOrder}
                onChange={handleChange}
              />
            </Form.Group>

            {formData.isBulkOrder && (
              <>
                <h5 className="mt-3 mb-3">Bulk Order Details</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bulk Order ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter bulk order ID"
                        name="bulkOrderId"
                        value={formData.bulkOrderId}
                        onChange={handleChange}
                        required={formData.isBulkOrder}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bulk Order Weight (kg)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter weight in kg"
                        name="bulkOrderWeight"
                        value={formData.bulkOrderWeight}
                        onChange={handleChange}
                        required={formData.isBulkOrder}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Bulk Delivery Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Enter bulk delivery address"
                    name="bulkDeliveryAddress"
                    value={formData.bulkDeliveryAddress}
                    onChange={handleChange}
                    required={formData.isBulkOrder}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Bulk Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter bulk contact number"
                    name="bulkContactNumber"
                    value={formData.bulkContactNumber}
                    onChange={handleChange}
                    required={formData.isBulkOrder}
                  />
                </Form.Group>
              </>
            )}

            <h5 className="mt-3 mb-3">Additional Options</h5>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Refrigerated Packing"
                    name="refrigeratedPacking"
                    checked={formData.refrigeratedPacking}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Insulated Packing"
                    name="insulatedPacking"
                    checked={formData.insulatedPacking}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Custom Packing"
                    name="customPacking"
                    checked={formData.customPacking}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Special Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter any special instructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                {isEditing ? 'Update Order' : 'Create Order'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DeliveryTrack;