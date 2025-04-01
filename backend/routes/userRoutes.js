const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register User
router.post('/register-user', async (req, res) => {
  try {
    const { name, address, phone, email, password, role } = req.body;

    // Validate required fields
    if (!name || !address || !phone || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create and save new user
    const newUser = new User({ name, address, phone, email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', data: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get All Users
router.get('/get-all-users', async (req, res) => {
  try {
    // Fetch all users excluding passwords
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get User Profile
router.get('/get-user-profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update User Profile
router.put('/update-user-profile', async (req, res) => {
  try {
    const { id, name, address, phone, email, role } = req.body;

    // Validate required fields
    if (!id || !name || !address || !phone || !email || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, address, phone, email, role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', data: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete User
router.delete('/delete-user/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Sign In User
router.post('/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email (include password field for comparison)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords (use bcrypt for secure password comparison if hashed)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Return user details without the password
    res.status(200).json({ message: 'Sign-in successful', data: user.toObject({ getters: true }) });
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;