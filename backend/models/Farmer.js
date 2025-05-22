const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    farmerName: { type: String, required: true },
    cropType: { type: String, required: true },
    farmSize: { type: String, required: true },
    farmLocation: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Farmer = mongoose.model('Farmer', farmerSchema);
module.exports = Farmer;