const express = require('express');
const Product = require('../models/Product'); // Import the Product model
const router = express.Router();


// Add a new product
router.post('/store-items', async (req, res) => {
  try {
    const { name, category, price, quantity, productionCost, fairProfitMargin, farmer } = req.body;

    // Validate required fields
    if (!name || !productionCost) {
      return res.status(400).json({ message: 'Name and production cost are required.' });
    }

    // Create a new product
    const newProduct = new Product({
      name,
      category,
      price,
      quantity,
      productionCost,
      fairProfitMargin,
      farmer,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: 'Product added successfully',
      product: savedProduct,
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});
// Get all products
router.get('/store-items', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Get a specific product by ID
router.get('/store-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

// Update product quantity
router.put('/store-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.quantity = quantity;
    await product.save();

    res.status(200).json({ message: 'Product quantity updated successfully!', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product quantity', error });
  }
});

// Update product details
router.put('/store-items/item/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
});

// Delete a product
router.delete('/store-items/item/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

// Fetch all products with optional filtering by category
router.get('/store-items/inventory-items', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory items', error });
  }
});

module.exports = router;