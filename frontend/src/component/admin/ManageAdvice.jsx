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
  Image,
} from 'react-bootstrap';
import { FaEdit, FaTrash, FaSearch, FaFileExcel, FaFilePdf, FaEye } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ManageAdvice = () => {
  // State for advice data
  const [adviceList, setAdviceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [modalTitle, setModalTitle] = useState('View Advice');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [currentAdvice, setCurrentAdvice] = useState({
    _id: '',
    fullName: '',
    email: '',
    subject: '',
    message: '',
    imagePath: '',
    createdAt: ''
  });
  const [error, setError] = useState(null);

  // Fetch all advice submissions from the backend
  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:5000/api/advice');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setAdviceList(Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching advice submissions:', error);
        setError('Failed to load advice submissions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAdvice();
  }, []);

  // Handle view details
  const handleView = (advice) => {
    setCurrentAdvice({
      _id: advice._id || '',
      fullName: advice.fullName || '',
      email: advice.email || '',
      subject: advice.subject || '',
      message: advice.message || '',
      imagePath: advice.imagePath || '',
      createdAt: advice.createdAt || ''
    });
    setModalTitle('Advice Details');
    setShowModal(true);
  };

  // Handle delete advice
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this advice submission?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/advice/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete advice submission');
        }
        
        setAdviceList(prev => prev.filter((advice) => advice._id !== id));
      } catch (error) {
        console.error('Error deleting advice:', error);
        alert('An error occurred while deleting the advice submission.');
      }
    }
  };

  // View image in modal
  const handleViewImage = (imagePath) => {
    if (!imagePath) return;
    setCurrentImage(`http://localhost:5000/${imagePath}`);
    setShowImageModal(true);
  };

  // Export to CSV
  const exportToCSV = () => {
    try {
      const dataToExport = filteredAdvice.map((advice) => ({
        'Full Name': advice.fullName || 'N/A',
        Email: advice.email || 'N/A',
        Subject: advice.subject || 'N/A',
        Message: advice.message || 'N/A',
        'Submitted Date': advice.createdAt ? new Date(advice.createdAt).toLocaleDateString() : 'N/A',
        'Has Image': advice.imagePath ? 'Yes' : 'No'
      }));

      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'AdviceSubmissions');
      XLSX.writeFile(wb, 'advice_submissions.csv');
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      alert('Failed to export data to CSV');
    }
  };

  // Export to PDF
  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text('Agricultural Advice Submissions Report', 14, 16);
      const headers = [['Name', 'Email', 'Subject', 'Message', 'Date Submitted']];
      const data = filteredAdvice.map((advice) => [
        advice.fullName || 'N/A',
        advice.email || 'N/A',
        advice.subject || 'N/A',
        advice.message ? (advice.message.length > 50 ? advice.message.substring(0, 50) + '...' : advice.message) : 'N/A',
        advice.createdAt ? new Date(advice.createdAt).toLocaleDateString() : 'N/A',
      ]);

      doc.autoTable({
        head: headers,
        body: data,
        startY: 20,
        styles: { fontSize: 8 },
        columnStyles: {
          3: { cellWidth: 60 } // Make message column wider
        }
      });
      doc.save('advice_submissions_report.pdf');
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Failed to export data to PDF');
    }
  };

  // Filter advice based on search term with null checks
  const filteredAdvice = adviceList.filter((advice) => {
    if (!advice) return false;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      (advice.fullName && advice.fullName.toLowerCase().includes(searchLower)) ||
      (advice.email && advice.email.toLowerCase().includes(searchLower)) ||
      (advice.subject && advice.subject.toLowerCase().includes(searchLower)) ||
      (advice.message && advice.message.toLowerCase().includes(searchLower))
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAdvice.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAdvice.length / itemsPerPage);

  // Format date with null check
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h4>Manage Agricultural Advice</h4>
              <div>
                <Button variant="light" size="sm" onClick={exportToCSV} className="me-2">
                  <FaFileExcel className="me-1" /> Export CSV
                </Button>
                <Button variant="light" size="sm" onClick={exportToPDF}>
                  <FaFilePdf className="me-1" /> Export PDF
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              {/* Search Controls */}
              <Row className="mb-3">
                <Col md={12}>
                  <InputGroup>
                    <FormControl
                      placeholder="Search by name, email, subject or message"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <InputGroup.Text>
                      <FaSearch />
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              
              {/* Advice Table */}
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
                        <th>Subject</th>
                        <th>Date Submitted</th>
                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((advice, index) => (
                          <tr key={advice._id || index}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{advice.fullName || 'N/A'}</td>
                            <td>{advice.email || 'N/A'}</td>
                            <td>{advice.subject || 'N/A'}</td>
                            <td>{formatDate(advice.createdAt)}</td>
                            <td className="text-center">
                              {advice.imagePath ? (
                                <Button
                                  variant="link"
                                  size="sm"
                                  onClick={() => handleViewImage(advice.imagePath)}
                                >
                                  <FaEye className="text-primary" />
                                </Button>
                              ) : (
                                <Badge bg="secondary">None</Badge>
                              )}
                            </td>
                            <td>
                              <Button
                                variant="outline-info"
                                size="sm"
                                className="me-2"
                                onClick={() => handleView(advice)}
                              >
                                <FaEye />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(advice._id)}
                                disabled={!advice._id}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">
                            {adviceList.length === 0 ? 'No advice submissions available' : 'No matching submissions found'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  
                  {/* Pagination */}
                  {filteredAdvice.length > itemsPerPage && (
                    <div className="d-flex justify-content-center">
                      <nav>
                        <ul className="pagination">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(currentPage - 1)}
                              disabled={currentPage === 1}
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
                              disabled={currentPage === totalPages}
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
      
      {/* Advice Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control plaintext readOnly defaultValue={currentAdvice.fullName || 'N/A'} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control plaintext readOnly defaultValue={currentAdvice.email || 'N/A'} />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control plaintext readOnly defaultValue={currentAdvice.subject || 'N/A'} />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                plaintext
                readOnly
                defaultValue={currentAdvice.message || 'N/A'}
              />
            </Form.Group>
            
            {currentAdvice.imagePath && (
              <Form.Group className="mb-3">
                <Form.Label>Attached Image</Form.Label>
                <div>
                  <Image
                    src={`http://localhost:5000/${currentAdvice.imagePath}`}
                    thumbnail
                    style={{ maxHeight: '200px', cursor: 'pointer' }}
                    onClick={() => handleViewImage(currentAdvice.imagePath)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/200x150?text=Image+Not+Available';
                    }}
                  />
                </div>
              </Form.Group>
            )}
            
            <Form.Group className="mb-3">
              <Form.Label>Submitted On</Form.Label>
              <Form.Control plaintext readOnly defaultValue={formatDate(currentAdvice.createdAt)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Image View Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>View Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image 
            src={currentImage} 
            fluid 
            style={{ maxHeight: '70vh' }} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageAdvice;