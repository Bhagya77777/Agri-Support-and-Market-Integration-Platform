import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer', // Default role is "customer"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register-user', { // Ensure the URL is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
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
        alert(`Registration failed. Server responded with: ${errorMessage.message || errorMessage}`);
        return;
      }

      // Parse the JSON response
      const data = await response.json();
      alert('Registration successful!');
      console.log('Registration Response:', data);

      // Reset the form after successful submission
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'customer',
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
            <h2 className="text-center text-success mb-4">Register</h2>
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

              {/* Phone Number */}
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Role */}
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
                </Form.Control>
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

export default RegistrationForm;