const express = require('express');
const router = express.Router();
const Buyer = require('../models/BuyerUSer');

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await Buyer.findOne({ 
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ 
                message: 'User with this email or username already exists' 
            });
        }

        // Create new buyer
        const newBuyer = new Buyer({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            password: req.body.password // Note: In production, always hash passwords
        });

        // Save buyer to database
        const savedBuyer = await newBuyer.save();

        // Return success response
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: savedBuyer._id,
                firstName: savedBuyer.firstName,
                lastName: savedBuyer.lastName,
                username: savedBuyer.username,
                email: savedBuyer.email
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            message: 'Error creating user', 
            error: error.message 
        });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        // Check if user exists
        const buyer = await Buyer.findOne({ 
            email: req.body.email,
            password: req.body.password // Note: In production, use proper password comparison
        });

        if (!buyer) {
            return res.status(400).json({ 
                message: 'Invalid email or password' 
            });
        }

        // Return success response
        res.status(200).json({
            message: 'Logged in successfully',
            user: {
                id: buyer._id,
                firstName: buyer.firstName,
                lastName: buyer.lastName,
                username: buyer.username,
                email: buyer.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Error logging in', 
            error: error.message 
        });
    }
});

// Get User Profile
router.get('/profile/:id', async (req, res) => {
    try {
        const user = await Buyer.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
});

// Update User Profile
router.put('/profile/:id', async (req, res) => {
    try {
        const updatedUser = await Buyer.findByIdAndUpdate(
            req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: {
                id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                username: updatedUser.username,
                email: updatedUser.email,
                phoneNumber: updatedUser.phoneNumber,
                address: updatedUser.address
            }
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
});

// Delete User
router.delete('/profile/:id', async (req, res) => {
    try {
        const deletedUser = await Buyer.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

module.exports = router;