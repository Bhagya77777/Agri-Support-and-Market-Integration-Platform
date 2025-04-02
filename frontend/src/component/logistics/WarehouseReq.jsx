import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const WarehouseReq = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactName: '',
    contactNumber: '', // Added contact number field
    typeOfGoods: '',
    storageDuration: '',
    quantity: '',
    specialRequirements: '',
    preferredLocation: '',
    dropOffDate: '',
    pickUpDate: '',
  });

  const [errors, setErrors] = useState({}); // State to store validation errors
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State to show success alert

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    // Validate Address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required.';
    }

    // Validate Contact Name
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact Name is required.';
    }

    // Validate Contact Number (must be exactly 10 digits)
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact Number is required.';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact Number must be exactly 10 digits.';
    }

    // Validate Type of Goods
    if (!formData.typeOfGoods.trim()) {
      newErrors.typeOfGoods = 'Type of Goods is required.';
    }

    // Validate Storage Duration
    if (!formData.storageDuration.trim()) {
      newErrors.storageDuration = 'Storage Duration is required.';
    }

    // Validate Quantity
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be a positive number.';
    }

    // Validate Special Requirements
    if (!formData.specialRequirements.trim()) {
      newErrors.specialRequirements = 'Special Requirements are required.';
    }

    // Validate Preferred Location
    if (!formData.preferredLocation.trim()) {
      newErrors.preferredLocation = 'Preferred Location is required.';
    }

    // Validate Drop Off Date
    if (!formData.dropOffDate) {
      newErrors.dropOffDate = 'Drop Off Date is required.';
    }

    // Validate Pick Up Date
    if (!formData.pickUpDate) {
      newErrors.pickUpDate = 'Pick Up Date is required.';
    } else if (formData.pickUpDate < formData.dropOffDate) {
      newErrors.pickUpDate = 'Pick Up Date must be after Drop Off Date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset success alert
    setShowSuccessAlert(false);

    // Validate the form
    if (!validateForm()) {
      return;
    }

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
      console.log('Request Response:', data);

      // Show success alert
      setShowSuccessAlert(true);

      // Reset the form after successful submission
      setFormData({
        name: '',
        address: '',
        contactName: '',
        contactNumber: '', // Reset contact number
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
      {/* Success Alert */}
      {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          Request submitted successfully!
        </Alert>
      )}

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
                  isInvalid={!!errors.name}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
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
                  isInvalid={!!errors.address}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
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
                  isInvalid={!!errors.contactName}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.contactName}</Form.Control.Feedback>
              </Form.Group>

              {/* Contact Number */}
              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter contact number (10 digits)"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.contactNumber}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.contactNumber}</Form.Control.Feedback>
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
                  isInvalid={!!errors.typeOfGoods}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.typeOfGoods}</Form.Control.Feedback>
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
                  isInvalid={!!errors.storageDuration}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.storageDuration}</Form.Control.Feedback>
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
                  isInvalid={!!errors.quantity}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
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
                  isInvalid={!!errors.specialRequirements}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.specialRequirements}</Form.Control.Feedback>
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
                  isInvalid={!!errors.preferredLocation}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.preferredLocation}</Form.Control.Feedback>
              </Form.Group>

              {/* Drop Off Date */}
              <Form.Group className="mb-3">
                <Form.Label>Drop Off Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dropOffDate"
                  value={formData.dropOffDate}
                  onChange={handleChange}
                  isInvalid={!!errors.dropOffDate}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.dropOffDate}</Form.Control.Feedback>
              </Form.Group>

              {/* Pick Up Date */}
              <Form.Group className="mb-3">
                <Form.Label>Pick Up Date</Form.Label>
                <Form.Control
                  type="date"
                  name="pickUpDate"
                  value={formData.pickUpDate}
                  onChange={handleChange}
                  isInvalid={!!errors.pickUpDate}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.pickUpDate}</Form.Control.Feedback>
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