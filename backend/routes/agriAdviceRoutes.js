const express = require('express');
const router = express.Router();
const AgriAdvice = require('../models/AgriAdvice');
const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');

// Submit agricultural advice form
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;
    
    const newAdvice = new AgriAdvice({
      fullName,
      email,
      subject,
      message,
      imagePath: req.file ? req.file.path : null,
      status: 'pending' // Default status
    });

    await newAdvice.save();
    
    res.status(201).json({
      success: true,
      message: 'Your advice request has been submitted successfully!',
      data: newAdvice
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get all advice requests (for admin panel)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const adviceRequests = await AgriAdvice.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: adviceRequests.length,
      data: adviceRequests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get single advice request
router.get('/:id', async (req, res) => {
  try {
    const advice = await AgriAdvice.findById(req.params.id);
    
    if (!advice) {
      return res.status(404).json({
        success: false,
        message: 'Advice request not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: advice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update advice request
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { fullName, email, subject, message, status } = req.body;
    
    let updateData = {
      fullName,
      email,
      subject,
      message,
      status,
      updatedAt: Date.now()
    };
    
    // Handle image update if new image is provided
    if (req.file) {
      // Delete old image if exists
      const existingAdvice = await AgriAdvice.findById(req.params.id);
      if (existingAdvice.imagePath) {
        const filePath = path.join(__dirname, '..', existingAdvice.imagePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      
      updateData.imagePath = req.file.path;
    }
    
    const updatedAdvice = await AgriAdvice.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedAdvice) {
      return res.status(404).json({
        success: false,
        message: 'Advice request not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Advice request updated successfully',
      data: updatedAdvice
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Update advice status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'reviewed', 'resolved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const updatedAdvice = await AgriAdvice.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!updatedAdvice) {
      return res.status(404).json({
        success: false,
        message: 'Advice request not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: updatedAdvice
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Delete advice request
router.delete('/:id', async (req, res) => {
  try {
    const advice = await AgriAdvice.findByIdAndDelete(req.params.id);
    
    if (!advice) {
      return res.status(404).json({
        success: false,
        message: 'Advice request not found'
      });
    }
    
    // Delete associated image if exists
    if (advice.imagePath) {
      const filePath = path.join(__dirname, '..', advice.imagePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    res.status(200).json({
      success: true,
      message: 'Advice request deleted successfully',
      data: advice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;