const express = require('express');
const router = express.Router();
const LogisticsProvider = require('../models/LogisticsProvider');

// Register a logistics provider
router.post('/register-logistics-provider', async (req, res) => {
  try {
    const {
      businessName,
      contactNumber,
      address,
      email,
      warehouseAddress,
      totalSpaceArea,
      typesOfGoods,
      availableStorageTypes,
      occupancyCapacity,
    } = req.body;

    // Validate required fields
    if (
      !businessName ||
      !contactNumber ||
      !address ||
      !email ||
      !warehouseAddress ||
      !totalSpaceArea ||
      !typesOfGoods ||
      !availableStorageTypes ||
      !occupancyCapacity
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the logistics provider already exists (e.g., by email)
    const existingProvider = await LogisticsProvider.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new logistics provider
    const logisticsProvider = new LogisticsProvider({
      businessName,
      contactNumber,
      address,
      email,
      warehouseAddress,
      totalSpaceArea,
      typesOfGoods,
      availableStorageTypes,
      occupancyCapacity,
    });

    await logisticsProvider.save();

    res.status(201).json({ message: 'Logistics provider registered successfully', data: logisticsProvider });
  } catch (error) {
    console.error('Error registering logistics provider:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Get all logistics providers
router.get('/logistics-providers', async (req, res) => {
  try {
    // Fetch all logistics providers from the database
    const providers = await LogisticsProvider.find().sort({ createdAt: -1 }); // Sort by creation date (newest first)

    // Return the providers as a JSON response
    res.status(200).json({ message: 'Logistics providers retrieved successfully', data: providers });
  } catch (error) {
    console.error('Error fetching logistics providers:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;