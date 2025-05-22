const mongoose = require('mongoose');

const deliveryOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
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
  email: { type: String, required: true },
  status: {
    type: String,
    enum: [
      'FIRST MILE RECEIVE SCAN',
      'RECEIVED IN FACILITY',
      'OUT FOR DELIVERY',
      'DELIVERED'
    ],
    default: 'FIRST MILE RECEIVE SCAN'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DeliveryOrder', deliveryOrderSchema);
