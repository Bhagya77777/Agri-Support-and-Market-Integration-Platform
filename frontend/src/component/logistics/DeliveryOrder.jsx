import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const DeliveryOrder = () => {
  const [formData, setFormData] = useState({
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
    preferredPacking: '',
    preferredVehicleType: '',
  });

  const [errors, setErrors] = useState({}); // State to store validation errors
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State to show success alert

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};

    // Validate Order ID
    if (!formData.orderId.trim()) {
      newErrors.orderId = 'Order ID is required.';
    }

    // Validate Delivery Address
    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Delivery Address is required.';
    }

    // Validate Contact Number
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact Number is required.';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact Number must be a 10-digit number.';
    }

    // Validate Bulk Order Fields if isBulkOrder is checked
    if (formData.isBulkOrder) {
      if (!formData.bulkOrderId.trim()) {
        newErrors.bulkOrderId = 'Bulk Order ID is required.';
      }
      if (!formData.bulkDeliveryAddress.trim()) {
        newErrors.bulkDeliveryAddress = 'Bulk Delivery Address is required.';
      }
      if (!formData.bulkContactNumber.trim()) {
        newErrors.bulkContactNumber = 'Bulk Contact Number is required.';
      } else if (!/^\d{10}$/.test(formData.bulkContactNumber)) {
        newErrors.bulkContactNumber = 'Bulk Contact Number must be a 10-digit number.';
      }
      if (!formData.bulkOrderWeight || formData.bulkOrderWeight <= 0) {
        newErrors.bulkOrderWeight = 'Bulk Order Weight must be a positive number.';
      }
    }

    // Validate Preferred Packing
    if (!formData.preferredPacking) {
      newErrors.preferredPacking = 'Preferred Packing is required.';
    }

    // Validate Preferred Vehicle Type
    if (!formData.preferredVehicleType) {
      newErrors.preferredVehicleType = 'Preferred Vehicle Type is required.';
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
      const response = await fetch('http://localhost:5000/api/create-delivery-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMessage;
        try {
          errorMessage = await response.json();
        } catch (err) {
          errorMessage = await response.text();
        }
        console.error('Server returned an error:', errorMessage);
        alert(`Submission failed. Server responded with: ${errorMessage.message || errorMessage}`);
        return;
      }

      // Parse the JSON response
      const data = await response.json();
      console.log('Order Submission Response:', data);

      // Show success alert
      setShowSuccessAlert(true);

      // Reset the form after successful submission
      setFormData({
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
        preferredPacking: '',
        preferredVehicleType: '',
      });
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during order submission:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Container className="mt-5">
      {/* Success Alert */}
      {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          Order submitted successfully!
        </Alert>
      )}

      <Row>
        <Col md={6} className="mx-auto">
          <Card className="p-4 shadow">
            <h2 className="text-center text-success mb-4">Delivery Order</h2>
            <Form onSubmit={handleSubmit}>
              {/* Order ID */}
              <Form.Group className="mb-3">
                <Form.Label>Enter Order ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter order ID"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  isInvalid={!!errors.orderId}
                />
                <Form.Control.Feedback type="invalid">{errors.orderId}</Form.Control.Feedback>
              </Form.Group>

              {/* Delivery Address */}
              <Form.Group className="mb-3">
                <Form.Label>Delivery Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter delivery address"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  isInvalid={!!errors.deliveryAddress}
                />
                <Form.Control.Feedback type="invalid">{errors.deliveryAddress}</Form.Control.Feedback>
              </Form.Group>

              {/* Contact Number */}
              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter contact number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.contactNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.contactNumber}</Form.Control.Feedback>
              </Form.Group>

              {/* Packing Details */}
              <h5 className="text-primary mb-3">Packing Details</h5>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Refrigerated Packing"
                  name="refrigeratedPacking"
                  checked={formData.refrigeratedPacking}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Insulated Packing"
                  name="insulatedPacking"
                  checked={formData.insulatedPacking}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Custom Packing"
                  name="customPacking"
                  checked={formData.customPacking}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Special Instructions */}
              <Form.Group className="mb-3">
                <Form.Label>Special Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter any special instructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Bulk Delivery Option */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Is this a Bulk Delivery Order?"
                  name="isBulkOrder"
                  checked={formData.isBulkOrder}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Bulk Delivery Fields (Conditionally Rendered) */}
              {formData.isBulkOrder && (
                <>
                  <h5 className="text-primary mb-3">Bulk Delivery Details</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Bulk Order ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter bulk order ID"
                      name="bulkOrderId"
                      value={formData.bulkOrderId}
                      onChange={handleChange}
                      isInvalid={!!errors.bulkOrderId}
                    />
                    <Form.Control.Feedback type="invalid">{errors.bulkOrderId}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bulk Delivery Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter bulk delivery address"
                      name="bulkDeliveryAddress"
                      value={formData.bulkDeliveryAddress}
                      onChange={handleChange}
                      isInvalid={!!errors.bulkDeliveryAddress}
                    />
                    <Form.Control.Feedback type="invalid">{errors.bulkDeliveryAddress}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bulk Contact Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter bulk contact number"
                      name="bulkContactNumber"
                      value={formData.bulkContactNumber}
                      onChange={handleChange}
                      isInvalid={!!errors.bulkContactNumber}
                    />
                    <Form.Control.Feedback type="invalid">{errors.bulkContactNumber}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bulk Order Weight</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter bulk order weight"
                      name="bulkOrderWeight"
                      value={formData.bulkOrderWeight}
                      onChange={handleChange}
                      isInvalid={!!errors.bulkOrderWeight}
                    />
                    <Form.Control.Feedback type="invalid">{errors.bulkOrderWeight}</Form.Control.Feedback>
                  </Form.Group>
                </>
              )}

              {/* Preferred Packing */}
              <Form.Group className="mb-3">
                <Form.Label>Preferred Packing</Form.Label>
                <Form.Control
                  as="select"
                  name="preferredPacking"
                  value={formData.preferredPacking}
                  onChange={handleChange}
                  isInvalid={!!errors.preferredPacking}
                >
                  <option value="">Select Packing Type</option>
                  <option value="Refrigerated">Refrigerated</option>
                  <option value="Insulated">Insulated</option>
                  <option value="Custom">Custom</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.preferredPacking}</Form.Control.Feedback>
              </Form.Group>

              {/* Preferred Vehicle Type */}
              <Form.Group className="mb-3">
                <Form.Label>Preferred Vehicle Type</Form.Label>
                <Form.Control
                  as="select"
                  name="preferredVehicleType"
                  value={formData.preferredVehicleType}
                  onChange={handleChange}
                  isInvalid={!!errors.preferredVehicleType}
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                  <option value="Lorry">Lorry</option>
                  <option value="Bike">Bike</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.preferredVehicleType}</Form.Control.Feedback>
              </Form.Group>

              {/* Submit Button */}
              <div className="d-grid">
                <Button variant="success" type="submit" className="rounded-pill">
                  Submit Order
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DeliveryOrder;