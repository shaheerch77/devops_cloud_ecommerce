const Notification = require('../models/Notification');

// Send / create a notification
const sendNotification = async (req, res) => {
    try {
        const { userId, type, title, message, metadata } = req.body;

        if (!userId || !type || !title || !message) {
            return res.status(400).json({ error: 'userId, type, title, and message are required' });
        }

        const notification = await Notification.create({ userId, type, title, message, metadata });

        // In a real system this would trigger an email / push / SMS
        console.log(`[NOTIFICATION] To: ${userId} | Type: ${type} | ${title}`);

        res.status(201).json({ message: 'Notification sent', notification });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all notifications for a user
const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId })
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get unread notifications for a user
const getUnreadNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId, read: false })
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        if (!notification) return res.status(404).json({ error: 'Notification not found' });
        res.json({ message: 'Notification marked as read', notification });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mark all notifications as read for a user
const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ userId: req.params.userId, read: false }, { read: true });
        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.json({ message: 'Notification deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    sendNotification,
    getUserNotifications,
    getUnreadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
};
