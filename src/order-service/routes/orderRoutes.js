const express = require('express');
const {
    createOrder,
    getAllOrders,
    getOrdersByUser,
    getOrderById,
    updateOrderStatus,
    cancelOrder
} = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);                          // Place new order
router.get('/', getAllOrders);                          // Get all orders
router.get('/user/:userId', getOrdersByUser);           // Get orders by user
router.get('/:id', getOrderById);                       // Get single order
router.put('/:id/status', updateOrderStatus);           // Update status
router.put('/:id/cancel', cancelOrder);                 // Cancel order

module.exports = router;
