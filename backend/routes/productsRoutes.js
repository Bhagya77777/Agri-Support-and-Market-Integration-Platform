const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Insert Product
router.post('/create-products', async (req, res) => {
    try {
        const {
            name,
            category,
            price,
            quantity,
            productionCost,
            fairProfitMargin,
            farmer,
        } = req.body;

        // Validate required fields
        if (!name || productionCost == null) {
            return res.status(400).json({ message: 'Name and production cost are required' });
        }

        // Create and save new product
        const newProduct = new Product({
            name,
            category,
            price,
            quantity,
            productionCost,
            fairProfitMargin,
            farmer,
        });

        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully', data: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all products
router.get('/get-products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'Products retrieved successfully', data: products });
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete product
router.delete('/delete-products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate product ID
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Find and delete the product
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update product
router.put('/update-products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate input
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true, // return updated document
            runValidators: true // apply schema validation
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
