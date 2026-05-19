const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: {
        type: String,
        enum: ['order_confirmed', 'order_shipped', 'order_delivered', 'order_cancelled', 'general'],
        required: true
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    metadata: { type: Object, default: {} }   // extra info e.g. orderId
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
