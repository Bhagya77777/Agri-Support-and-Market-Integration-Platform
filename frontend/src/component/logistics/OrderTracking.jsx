import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ProgressBar, Alert } from 'react-bootstrap';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Define the expected delivery steps
  const deliverySteps = [
    'FIRST MILE RECEIVE SCAN',
    'RECEIVED IN FACILITY',
    'OUT FOR DELIVERY',
    'DELIVERED'
  ];

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      setError('Order ID is required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/track-order/${orderId}`);
      if (!response.ok) {
        throw new Error('Order not found or server error');
      }
      const data = await response.json();

      // Get current status from backend or fallback for demo
      const currentStatus = data.status || 'FIRST MILE RECEIVE SCAN';

      // Calculate index of current step
      const currentIndex = deliverySteps.indexOf(currentStatus.toUpperCase());

      setTrackingData({
        orderId,
        status: currentStatus,
        currentIndex,
        allSteps: deliverySteps
      });
    } catch (err) {
      setError(err.message);
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="mx-auto">
          <Card className="p-4 shadow-sm">
            <h3 className="text-center text-success mb-4">Track Your Delivery</h3>

            {/* Input for Order ID */}
            <Form.Group className="mb-3">
              <Form.Label>Enter Order ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                disabled={loading}
              />
            </Form.Group>

            {/* Track Button */}
            <div className="d-grid">
              <Button
                variant="success"
                onClick={handleTrackOrder}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Track Order'}
              </Button>
            </div>

            {/* Error Message */}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Card>

          {/* Display Tracking Progress if available */}
          {trackingData && (
            <Card className="mt-4 p-4 shadow-sm">
              <h5 className="text-primary">Order ID: {trackingData.orderId}</h5>
              <p><strong>Current Status:</strong> {trackingData.status}</p>

              {/* Progress Bar */}
              <ProgressBar
                now={(trackingData.currentIndex / (trackingData.allSteps.length - 1)) * 100}
                label={`${trackingData.currentIndex + 1} of ${trackingData.allSteps.length}`}
                className="mb-3"
              />

              {/* Steps List */}
              <ul className="list-group">
                {trackingData.allSteps.map((step, index) => (
                  <li
                    key={index}
                    className={`list-group-item ${
                      index <= trackingData.currentIndex ? 'bg-success text-white' : ''
                    }`}
                  >
                    {step}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default OrderTracking;