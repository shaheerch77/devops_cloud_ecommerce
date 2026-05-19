const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { userId, items, shippingAddress } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'Order must have at least one item' });
        }

        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const order = await Order.create({
            userId,
            items,
            totalAmount,
            shippingAddress
        });

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all orders (admin use)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get orders by userId
const getOrdersByUser = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json({ message: 'Order status updated', order });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Cancel an order
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        if (order.status === 'shipped' || order.status === 'delivered') {
            return res.status(400).json({ error: 'Cannot cancel order that is already shipped or delivered' });
        }
        order.status = 'cancelled';
        await order.save();
        res.json({ message: 'Order cancelled', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createOrder, getAllOrders, getOrdersByUser, getOrderById, updateOrderStatus, cancelOrder };
