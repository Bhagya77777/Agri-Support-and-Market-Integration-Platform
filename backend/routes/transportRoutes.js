const express = require('express');
const router = express.Router();
const TransportProvider = require('../models/TransportProvider');

// Register a transport provider
router.post('/register-transport-provider', async (req, res) => {
  try {
    const { fullName, address, contactNumber, vehicleType, vehicleRegNumber, capacity } = req.body;

    // Validate required fields
    if (!fullName || !address || !contactNumber || !vehicleType || !vehicleRegNumber || !capacity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the transport provider already exists
    const existingProvider = await TransportProvider.findOne({ vehicleRegNumber });
    if (existingProvider) {
      return res.status(400).json({ message: 'Vehicle registration number already exists' });
    }

    // Create a new transport provider
    const transportProvider = new TransportProvider({
      fullName,
      address,
      contactNumber,
      vehicleType,
      vehicleRegNumber,
      capacity,
    });

    await transportProvider.save();

    res.status(201).json({ message: 'Transport provider registered successfully', data: transportProvider });
  } catch (error) {
    console.error('Error registering transport provider:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;