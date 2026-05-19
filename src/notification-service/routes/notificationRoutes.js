const express = require('express');
const {
    sendNotification,
    getUserNotifications,
    getUnreadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
} = require('../controllers/notificationController');

const router = express.Router();

router.post('/', sendNotification);                                 // Send notification
router.get('/user/:userId', getUserNotifications);                  // All notifications for user
router.get('/user/:userId/unread', getUnreadNotifications);         // Unread only
router.put('/:id/read', markAsRead);                                // Mark one as read
router.put('/user/:userId/read-all', markAllAsRead);                // Mark all as read
router.delete('/:id', deleteNotification);                          // Delete notification

module.exports = router;
