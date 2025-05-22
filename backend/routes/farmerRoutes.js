const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');
const Order = require('../models/Order');

// Farmer Signup
router.post('/signup', async (req, res) => {
  try {
    const { farmerName, cropType, farmSize, farmLocation, phoneNumber, email, password } = req.body;

    // Validate required fields
    if (!farmerName || !cropType || !farmSize || !farmLocation || !phoneNumber || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create and save new farmer
    const newFarmer = new Farmer({ farmerName, cropType, farmSize, farmLocation, phoneNumber, email, password });
    await newFarmer.save();

    res.status(201).json({ message: 'Farmer registered successfully', data: newFarmer });
  } catch (error) {
    console.error('Error registering farmer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Farmer Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if farmer exists
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password (assuming you have a method to compare passwords)
    if (farmer.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', data: farmer });
  } catch (error) {
    console.error('Error logging in farmer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get Farmer Profile
router.get('/profile/:id', async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    res.status(200).json(farmer);
  } catch (error) {
    console.error('Error fetching farmer profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all orders for a farmer
router.get('/get-orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ message: 'Orders fetched successfully', data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE an order
router.delete('/delete-order/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully', data: deletedOrder });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Profile update
router.put('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { farmerName, cropType, farmSize, farmLocation, phoneNumber, email } = req.body;

    // Validate required fields
    if (!farmerName || !cropType || !farmSize || !farmLocation || !phoneNumber || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedFarmer = await Farmer.findByIdAndUpdate(id, { farmerName, cropType, farmSize, farmLocation, phoneNumber, email }, { new: true });
    if (!updatedFarmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', data: updatedFarmer });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete Farmer Profile
router.delete('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFarmer = await Farmer.findByIdAndDelete(id);
    if (!deletedFarmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;