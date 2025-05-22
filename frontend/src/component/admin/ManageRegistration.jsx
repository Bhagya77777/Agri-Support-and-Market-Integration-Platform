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
} from 'react-bootstrap';
import { FaEdit, FaTrash, FaSearch, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ManageRegistration = () => {
  // State for form data
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  });

  // State for registrations data
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add New Registration');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch all users from the backend
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get-all-users'); // Updated endpoint
        const data = await response.json();
        setRegistrations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        setLoading(false);
      }
    };
    fetchRegistrations();
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
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const url = formData.id
        ? `http://localhost:5000/api/update-user-profile` // Update route
        : 'http://localhost:5000/api/register-user'; // Register route
      const method = formData.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: formData.id,
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (formData.id) {
        // Update existing user
        setRegistrations(registrations.map((reg) => (reg._id === formData.id ? data.data : reg)));
      } else {
        // Add new user
        setRegistrations([...registrations, data.data]);
      }

      resetForm();
      setShowModal(false);
      alert(`Registration ${formData.id ? 'updated' : 'added'} successfully!`);
    } catch (error) {
      console.error('Error saving registration:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  // Edit registration
  const handleEdit = (registration) => {
    setFormData({
      id: registration._id,
      name: registration.name,
      address: registration.address,
      phone: registration.phone,
      email: registration.email,
      password: '',
      confirmPassword: '',
      role: registration.role,
    });
    setModalTitle('Edit Registration');
    setShowModal(true);
  };

  // Delete registration
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      try {
        await fetch(`http://localhost:5000/api/delete-user/${id}`, { // Updated endpoint
          method: 'DELETE',
        });
        setRegistrations(registrations.filter((reg) => reg._id !== id));
        alert('Registration deleted successfully!');
      } catch (error) {
        console.error('Error deleting registration:', error);
        alert('An error occurred while deleting the registration.');
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      address: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'customer',
    });
    setModalTitle('Add New Registration');
  };

  // Export to CSV
  const exportToCSV = () => {
    const dataToExport = filteredRegistrations.map((reg) => ({
      Name: reg.name,
      Email: reg.email,
      Phone: reg.phone,
      Address: reg.address,
      Role: reg.role,
      'Registered Date': new Date(reg.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registrations');
    XLSX.writeFile(wb, 'registrations.csv');
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Registrations Report', 14, 16);
    const headers = [['Name', 'Email', 'Phone', 'Role', 'Registered Date']];
    const data = filteredRegistrations.map((reg) => [
      reg.name,
      reg.email,
      reg.phone,
      reg.role,
      new Date(reg.createdAt).toLocaleDateString(),
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
      styles: { fontSize: 8 },
    });
    doc.save('registrations_report.pdf');
  };

  // Filter registrations based on search term
  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm) ||
      reg.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRegistrations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h4>Manage Registrations</h4>
              <div>
            
              </div>
            </Card.Header>
            <Card.Body>
              {/* Search and Export Controls */}
              <Row className="mb-3">
                <Col md={6}>
                  <InputGroup>
                    <FormControl
                      placeholder="Search by name, email, phone or role"
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
              {/* Registrations Table */}
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((reg, index) => (
                          <tr key={reg._id}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{reg.name}</td>
                            <td>{reg.email}</td>
                            <td>{reg.phone}</td>
                            <td>{reg.address}</td>
                            <td>
                              <span
                                className={`badge ${
                                  reg.role === 'customer'
                                    ? 'bg-primary'
                                    : reg.role === 'transporter'
                                    ? 'bg-warning text-dark'
                                    : 'bg-info text-dark'
                                }`}
                              >
                                {reg.role}
                              </span>
                            </td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => handleEdit(reg)}
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(reg._id)}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">No registrations found</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  {/* Pagination */}
                  {filteredRegistrations.length > itemsPerPage && (
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
      <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="customer">Customer</option>
                <option value="transporter">Transporter</option>
                <option value="logisticsProvider">Logistics Provider</option>
                <option value="farmer">Farmer</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
            {!formData.id && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!formData.id}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!formData.id}
                  />
                </Form.Group>
              </>
            )}
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                {formData.id ? 'Update' : 'Save'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageRegistration;