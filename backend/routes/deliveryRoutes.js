const express = require('express');
const router = express.Router();
const DeliveryOrder = require('../models/DeliveryOrder');
const { sendOrderConfirmation } = require('../utils/mailer');

// Middleware to parse JSON requests
router.use(express.json());

// POST: Create a new delivery order
router.post('/create-delivery-order', async (req, res) => {
  try {
    const {
      orderId,
      deliveryAddress,
      contactNumber,
      refrigeratedPacking,
      insulatedPacking,
      customPacking,
      specialInstructions,
      isBulkOrder,
      bulkOrderId,
      bulkDeliveryAddress,
      bulkContactNumber,
      bulkOrderWeight,
      preferredPacking,
      preferredVehicleType,
      email
    } = req.body;

    // Required fields validation
    if (!orderId || !deliveryAddress || !contactNumber || !preferredPacking || !preferredVehicleType || !email) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Phone number format validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(contactNumber)) {
      return res.status(400).json({ message: 'Contact number must be 10 digits' });
    }

    if (isBulkOrder) {
      if (!bulkOrderId || !bulkDeliveryAddress || !bulkContactNumber || !bulkOrderWeight || isNaN(bulkOrderWeight)) {
        return res.status(400).json({ message: 'Bulk order requires all bulk-specific fields' });
      }
      if (!phoneRegex.test(bulkContactNumber)) {
        return res.status(400).json({ message: 'Bulk contact number must be 10 digits' });
      }
    }

    // Check if order already exists
    const existingOrder = await DeliveryOrder.findOne({ orderId });
    if (existingOrder) {
      return res.status(400).json({ message: 'Order ID already exists' });
    }

    // Save delivery order
    const deliveryOrder = new DeliveryOrder({
      orderId,
      deliveryAddress,
      contactNumber,
      refrigeratedPacking,
      insulatedPacking,
      customPacking,
      specialInstructions,
      isBulkOrder,
      bulkOrderId,
      bulkDeliveryAddress,
      bulkContactNumber,
      bulkOrderWeight,
      preferredPacking,
      preferredVehicleType,
      email
    });

    await deliveryOrder.save();

    // Send email
    await sendOrderConfirmation(email, orderId, deliveryOrder.status);

    res.status(201).json({
      message: 'Delivery order created successfully',
      data: deliveryOrder
    });
  } catch (error) {
    console.error('Error creating delivery order:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// GET: Get all delivery orders
router.get('/get-delivery-orders', async (req, res) => {
  try {
    const orders = await DeliveryOrder.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching delivery orders:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// GET: Get delivery order by MongoDB ID
router.get('/get-delivery-order/:id', async (req, res) => {
  try {
    const order = await DeliveryOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update a delivery order by MongoDB ID
router.put('/update-delivery-order/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    // Validate required fields
    if (
      !updatedFields.orderId ||
      !updatedFields.deliveryAddress ||
      !updatedFields.contactNumber ||
      !updatedFields.preferredPacking ||
      !updatedFields.preferredVehicleType ||
      !updatedFields.email
    ) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Phone number format validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(updatedFields.contactNumber)) {
      return res.status(400).json({ message: 'Contact number must be 10 digits' });
    }

    if (updatedFields.isBulkOrder) {
      if (
        !updatedFields.bulkOrderId ||
        !updatedFields.bulkDeliveryAddress ||
        !updatedFields.bulkContactNumber ||
        !updatedFields.bulkOrderWeight ||
        isNaN(updatedFields.bulkOrderWeight)
      ) {
        return res.status(400).json({ message: 'Bulk order requires all bulk-specific fields' });
      }
      if (!phoneRegex.test(updatedFields.bulkContactNumber)) {
        return res.status(400).json({ message: 'Bulk contact number must be 10 digits' });
      }
    }

    // Update the delivery order
    const updatedOrder = await DeliveryOrder.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      message: 'Delivery order updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Error updating delivery order:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// DELETE: Delete a delivery order by MongoDB ID
router.delete('/delete-delivery-order/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the delivery order
    const deletedOrder = await DeliveryOrder.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      message: 'Delivery order deleted successfully',
      data: deletedOrder
    });
  } catch (error) {
    console.error('Error deleting delivery order:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// GET: Track order by order ID
router.get('/track-order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await DeliveryOrder.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ status: order.status });
  } catch (error) {
    console.error('Error tracking order:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PATCH: Update status and send email
router.patch('/update-status/:orderId', async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      'FIRST MILE RECEIVE SCAN',
      'RECEIVED IN FACILITY',
      'OUT FOR DELIVERY',
      'DELIVERED'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await DeliveryOrder.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await sendOrderConfirmation(order.email, order.orderId, status);

    res.json({ message: `Status updated to ${status} and email sent.` });
  } catch (error) {
    console.error('Error updating status:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;