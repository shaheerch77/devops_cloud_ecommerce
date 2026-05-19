const User = require('../models/User');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: 'User registered', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        res.json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProfile = async (req, res) => {
    res.json({ message: 'Profile fetched', user: { name: 'Test User', email: 'test@test.com' } });
};

module.exports = { registerUser, loginUser, getProfile };