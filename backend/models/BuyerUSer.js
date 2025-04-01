const mongoose = require('mongoose');

// Define the User schema with more fields for registration
const buyerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,  // Trim any extra spaces
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensures unique usernames
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures unique email addresses
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'], 
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number.'], 
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, // Password field
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the User model
const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;
