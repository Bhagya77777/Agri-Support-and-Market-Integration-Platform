import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      alert('Order submitted successfully!');
      console.log('Order Submission Response:', data);

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
                  required
                />
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
                  required
                />
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
                  required
                />
              </Form.Group>

              {/* Packing Details */}
              <h5 className="text-primary mb-3">Packing Details</h5>

              {/* Refrigerated Packing */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Refrigerated Packing"
                  name="refrigeratedPacking"
                  checked={formData.refrigeratedPacking}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Insulated Packing */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Insulated Packing"
                  name="insulatedPacking"
                  checked={formData.insulatedPacking}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Custom Packing */}
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

                  {/* Bulk Order ID */}
                  <Form.Group className="mb-3">
                    <Form.Label>Bulk Order ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter bulk order ID"
                      name="bulkOrderId"
                      value={formData.bulkOrderId}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {/* Bulk Delivery Address */}
                  <Form.Group className="mb-3">
                    <Form.Label>Bulk Delivery Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter bulk delivery address"
                      name="bulkDeliveryAddress"
                      value={formData.bulkDeliveryAddress}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {/* Bulk Contact Number */}
                  <Form.Group className="mb-3">
                    <Form.Label>Bulk Contact Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter bulk contact number"
                      name="bulkContactNumber"
                      value={formData.bulkContactNumber}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {/* Bulk Order Weight */}
                  <Form.Group className="mb-3">
                    <Form.Label>Bulk Order Weight</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter bulk order weight"
                      name="bulkOrderWeight"
                      value={formData.bulkOrderWeight}
                      onChange={handleChange}
                      required
                    />
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
                  required
                >
                  <option value="">Select Packing Type</option>
                  <option value="Refrigerated">Refrigerated</option>
                  <option value="Insulated">Insulated</option>
                  <option value="Custom">Custom</option>
                </Form.Control>
              </Form.Group>

              {/* Preferred Vehicle Type */}
              <Form.Group className="mb-3">
                <Form.Label>Preferred Vehicle Type</Form.Label>
                <Form.Control
                  as="select"
                  name="preferredVehicleType"
                  value={formData.preferredVehicleType}
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