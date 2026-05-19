const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile); // Add auth middleware later

module.exports = router;