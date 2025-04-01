const express = require('express');
const router = express.Router();
const DeliveryOrder = require('../models/DeliveryOrder');

// Create a new delivery order
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
    } = req.body;

    // Validate required fields for regular delivery orders
    if (!orderId || !deliveryAddress || !contactNumber || !preferredPacking || !preferredVehicleType) {
      return res.status(400).json({ message: 'All regular delivery fields are required' });
    }

    // If bulk order is selected, validate bulk-specific fields
    if (isBulkOrder) {
      if (
        !bulkOrderId ||
        !bulkDeliveryAddress ||
        !bulkContactNumber ||
        !bulkOrderWeight
      ) {
        return res.status(400).json({ message: 'All bulk delivery fields are required' });
      }
    }

    // Create a new delivery order
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
    });

    await deliveryOrder.save();

    res.status(201).json({ 
      message: 'Delivery order created successfully', 
      data: deliveryOrder 
    });
  } catch (error) {
    console.error('Error creating delivery order:', error);
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
});

// Get all delivery orders
router.get('/get-delivery-orders', async (req, res) => {
  try {
    const orders = await DeliveryOrder.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching delivery orders:', error);
    res.status(500).json({ 
      message: 'Failed to fetch delivery orders', 
      error: error.message 
    });
  }
});

// Get a single delivery order by ID
router.get('/get-delivery-order/:id', async (req, res) => {
  try {
    const order = await DeliveryOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Delivery order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching delivery order:', error);
    res.status(500).json({ 
      message: 'Failed to fetch delivery order', 
      error: error.message 
    });
  }
});

// Update a delivery order
router.put('/update-delivery-order/:id', async (req, res) => {
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
    } = req.body;

    // Validate required fields
    if (!orderId || !deliveryAddress || !contactNumber || !preferredPacking || !preferredVehicleType) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // If bulk order is selected, validate bulk-specific fields
    if (isBulkOrder) {
      if (
        !bulkOrderId ||
        !bulkDeliveryAddress ||
        !bulkContactNumber ||
        !bulkOrderWeight
      ) {
        return res.status(400).json({ message: 'All bulk delivery fields are required' });
      }
    }

    const updatedOrder = await DeliveryOrder.findByIdAndUpdate(
      req.params.id,
      {
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
      },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Delivery order not found' });
    }

    res.status(200).json({ 
      message: 'Delivery order updated successfully', 
      data: updatedOrder 
    });
  } catch (error) {
    console.error('Error updating delivery order:', error);
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
});

// Delete a delivery order
router.delete('/delete-delivery-order/:id', async (req, res) => {
  try {
    const deletedOrder = await DeliveryOrder.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Delivery order not found' });
    }
    res.status(200).json({ 
      message: 'Delivery order deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting delivery order:', error);
    res.status(500).json({ 
      message: 'Failed to delete delivery order', 
      error: error.message 
    });
  }
});

module.exports = router;