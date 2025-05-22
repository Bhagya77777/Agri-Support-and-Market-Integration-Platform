const mongoose = require('mongoose');

const warehouseRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactName: { type: String, required: true },
  typeOfGoods: { type: String, required: true },
  storageDuration: { type: String, required: true },
  quantity: { type: Number, required: true },
  specialRequirements: { type: String, required: true },
  preferredLocation: { type: String, required: true },
  dropOffDate: { type: Date, required: true },
  pickUpDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WarehouseRequest', warehouseRequestSchema);