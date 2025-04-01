import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const WarehouseReq = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the backend
      const response = await fetch('http://localhost:5000/api/request-warehouse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle non-200 status codes
        let errorMessage;
        try {
          errorMessage = await response.json(); // Try to parse the error message as JSON
        } catch (err) {
          errorMessage = await response.text(); // Fallback to plain text if JSON parsing fails
        }
        console.error('Server returned an error:', errorMessage);
        alert(`Request failed. Server responded with: ${errorMessage.message || errorMessage}`);
        return;
      }

      // Parse the JSON response
      const data = await response.json();
      alert('Request submitted successfully!');
      console.log('Request Response:', data);

      // Reset the form after successful submission
      setFormData({
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
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during request submission:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="mx-auto">
          <Card className="p-4 shadow">
            <h2 className="text-center text-success mb-4">Requesting A Warehouse</h2>
            <Form onSubmit={handleSubmit}>
              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Address */}
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Contact Name */}
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

              {/* Storage Requirements */}
              <h5 className="text-primary mb-3">Storage Requirements</h5>

              {/* Type of Goods Storing */}
              <Form.Group className="mb-3">
                <Form.Label>Type of Goods Storing</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter types of goods (e.g., perishable, dry goods)"
                  name="typeOfGoods"
                  value={formData.typeOfGoods}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Storage Duration */}
              <Form.Group className="mb-3">
                <Form.Label>Storage Duration</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter storage duration (e.g., 1 month, 6 months)"
                  name="storageDuration"
                  value={formData.storageDuration}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Quantity */}
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

              {/* Special Storage Requirements */}
              <Form.Group className="mb-3">
                <Form.Label>Special Storage Requirements</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter any special storage requirements"
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Preferred Warehouse Location */}
              <Form.Group className="mb-3">
                <Form.Label>Preferred Warehouse Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter preferred location"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Drop Off Date */}
              <Form.Group className="mb-3">
                <Form.Label>Drop Off Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dropOffDate"
                  value={formData.dropOffDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Pick Up Date */}
              <Form.Group className="mb-3">
                <Form.Label>Pick Up Date</Form.Label>
                <Form.Control
                  type="date"
                  name="pickUpDate"
                  value={formData.pickUpDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Submit Button */}
              <div className="d-grid">
                <Button variant="success" type="submit" className="rounded-pill">
                  Submit Request
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WarehouseReq;