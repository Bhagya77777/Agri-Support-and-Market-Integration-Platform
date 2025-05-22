const express = require('express');
const router = express.Router();
const WarehouseRequest = require('../models/WarehouseRequest');

// Get all warehouse requests
router.get('/requests', async (req, res) => {
  try {
    const requests = await WarehouseRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching warehouse requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new warehouse request
router.post('/request-warehouse', async (req, res) => {
  try {
    const {
      name,
      address,
      contactName,
      typeOfGoods,
      storageDuration,
      quantity,
      specialRequirements,
      preferredLocation,
      dropOffDate,
      pickUpDate,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !address ||
      !contactName ||
      !typeOfGoods ||
      !storageDuration ||
      !quantity ||
      !specialRequirements ||
      !preferredLocation ||
      !dropOffDate ||
      !pickUpDate
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const warehouseRequest = new WarehouseRequest({
      name,
      address,
      contactName,
      typeOfGoods,
      storageDuration,
      quantity,
      specialRequirements,
      preferredLocation,
      dropOffDate: new Date(dropOffDate),
      pickUpDate: new Date(pickUpDate),
    });

    await warehouseRequest.save();

    res.status(201).json({ 
      message: 'Warehouse request submitted successfully', 
      data: warehouseRequest 
    });
  } catch (error) {
    console.error('Error submitting warehouse request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a warehouse request
router.put('/update-request/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      contactName,
      typeOfGoods,
      storageDuration,
      quantity,
      specialRequirements,
      preferredLocation,
      dropOffDate,
      pickUpDate,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !address ||
      !contactName ||
      !typeOfGoods ||
      !storageDuration ||
      !quantity ||
      !specialRequirements ||
      !preferredLocation ||
      !dropOffDate ||
      !pickUpDate
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedRequest = await WarehouseRequest.findByIdAndUpdate(
      id,
      {
        name,
        address,
        contactName,
        typeOfGoods,
        storageDuration,
        quantity,
        specialRequirements,
        preferredLocation,
        dropOffDate: new Date(dropOffDate),
        pickUpDate: new Date(pickUpDate),
      },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Warehouse request not found' });
    }

    res.json({ 
      message: 'Warehouse request updated successfully', 
      data: updatedRequest 
    });
  } catch (error) {
    console.error('Error updating warehouse request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a warehouse request
router.delete('/delete-request/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await WarehouseRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: 'Warehouse request not found' });
    }

    res.json({ message: 'Warehouse request deleted successfully' });
  } catch (error) {
    console.error('Error deleting warehouse request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;