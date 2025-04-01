const mongoose = require('mongoose');

const deliveryOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  contactNumber: { type: String, required: true },
  refrigeratedPacking: { type: Boolean, default: false },
  insulatedPacking: { type: Boolean, default: false },
  customPacking: { type: Boolean, default: false },
  specialInstructions: { type: String },
  isBulkOrder: { type: Boolean, default: false }, 
  bulkOrderId: { type: String },
  bulkDeliveryAddress: { type: String },
  bulkContactNumber: { type: String },
  bulkOrderWeight: { type: Number },
  preferredPacking: { type: String, required: true },
  preferredVehicleType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DeliveryOrder', deliveryOrderSchema);