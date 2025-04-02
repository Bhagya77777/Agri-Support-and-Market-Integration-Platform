const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.PUBLIC_URL || 'http://localhost:5173', 
  credentials: true, 
  optionsSuccessStatus: 200 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Routes
const transportRoutes = require('./routes/transportRoutes');
const logisticsRoutes = require('./routes/logisticsRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const userRoutes = require('./routes/userRoutes');
const storeItemRoutes = require('./routes/storeItemRoutes');
const orderRoutes = require('./routes/Orders');
const buyerAuthRoutes = require('./routes/buyerAuth');
const agriAdviceRoutes = require('./routes/agriAdviceRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Use the routes (keeping all existing endpoints)
app.use('/api', transportRoutes);
app.use('/api', logisticsRoutes);
app.use('/api', warehouseRoutes);
app.use('/api', deliveryRoutes);
app.use('/api', userRoutes);
app.use('/store-items', storeItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/buyer', buyerAuthRoutes);
app.use('/api/advice', agriAdviceRoutes); 
app.use('/api/feedback', feedbackRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});