const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  category: String,
  price: Number,
  quantity: Number,
  productionCost: { type: Number, required: true },
  fairProfitMargin: { type: Number, default: 30 }, // profit margin
  farmer: { type: Schema.Types.ObjectId, ref: "Farmer" },
}, { timestamps: true });

module.exports = model("Product", productSchema);