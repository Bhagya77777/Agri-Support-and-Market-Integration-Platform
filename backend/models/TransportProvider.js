const mongoose = require('mongoose');

const transportProviderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleRegNumber: { type: String, required: true },
  capacity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TransportProvider', transportProviderSchema);