const Product = require('./model/Product');
const fs = require('fs');
const path = require('path');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { productName, price, description } = req.body;
        const productImage = req.file ? req.file.filename : null;

        const product = await Product.create({
            productName,
            price,
            description,
            productImage,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all products

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, price, description } = req.body;
        const productImage = req.file ? req.file.filename : null;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Handle the new image file uploaded
        const oldImagePath = path.join(__dirname, '../uploads', product.productImage);
        if (productImage) {
            fs.unlinkSync(oldImagePath);
        }

        product.productName = productName;
        product.price = price;
        product.description = description;
        product.productImage = productImage;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
