const mongoose = require('mongoose');

const logisticsProviderSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  warehouseAddress: { type: String, required: true },
  totalSpaceArea: { type: Number, required: true },
  typesOfGoods: { type: String, required: true },
  availableStorageTypes: { type: String, required: true },
  occupancyCapacity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LogisticsProvider', logisticsProviderSchema);