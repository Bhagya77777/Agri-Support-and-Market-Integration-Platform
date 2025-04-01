import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const TransportReg = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    contactNumber: '',
    vehicleType: '',
    vehicleRegNumber: '',
    capacity: '',
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
      const response = await fetch('http://localhost:5000/api/register-transport-provider', { // Ensure the URL is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle non-200 status codes
        const errorMessage = await response.text(); // Try to get the response as text
        console.error('Server returned an error:', errorMessage);
        alert(`Registration failed. Server responded with: ${errorMessage}`);
        return;
      }

      // Parse the JSON response
      const data = await response.json();
      alert('Registration successful!');
      console.log('Registration Response:', data);

      // Reset the form after successful submission
      setFormData({
        fullName: '',
        address: '',
        contactNumber: '',
        vehicleType: '',
        vehicleRegNumber: '',
        capacity: '',
      });
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during registration:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="mx-auto">
          <Card className="p-4 shadow">
            <h2 className="text-center text-success mb-4">Register As a Transport Provider</h2>
            <Form onSubmit={handleSubmit}>
              {/* Full Name */}
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  name="fullName"
                  value={formData.fullName}
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

              {/* Contact Number */}
              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your contact number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Vehicle Type */}
              <Form.Group className="mb-3">
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Control
                  as="select"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                  <option value="Lorry">Lorry</option>
                  <option value="Bike">Bike</option>
                </Form.Control>
              </Form.Group>

              {/* Vehicle Registration Number */}
              <Form.Group className="mb-3">
                <Form.Label>Vehicle Registration Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter vehicle registration number"
                  name="vehicleRegNumber"
                  value={formData.vehicleRegNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Capacity */}
              <Form.Group className="mb-3">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter vehicle capacity (in tons)"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Submit Button */}
              <div className="d-grid">
                <Button variant="success" type="submit" className="rounded-pill">
                  Register
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TransportReg;