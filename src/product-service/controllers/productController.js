const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
};

const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
};

const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
};

module.exports = { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct };