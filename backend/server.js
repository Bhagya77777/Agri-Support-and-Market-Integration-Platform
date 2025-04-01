const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();


const app = express();


app.use(cors({
  origin: process.env.PUBLIC_URL || 'http://localhost:5173', 
  credentials: true, 
  optionsSuccessStatus: 200 
}));
app.use(express.json()); 

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const transportRoutes = require('./routes/transportRoutes');
const logisticsRoutes = require('./routes/logisticsRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const userRoutes = require('./routes/userRoutes');
const storeItemRoutes = require('./routes/storeItemRoutes');
const orderRoutes = require('./routes/Orders');
const buyerAuthRoutes = require('./routes/buyerAuth');

// Use the routes
app.use('/api', transportRoutes);
app.use('/api', logisticsRoutes);
app.use('/api', warehouseRoutes);
app.use('/api', deliveryRoutes);
app.use('/api', userRoutes);
app.use('/store-items', storeItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/buyer', buyerAuthRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});