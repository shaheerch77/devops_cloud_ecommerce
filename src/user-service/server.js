const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Parse JSON requests
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);

// Connect to MongoDB using environment variable or fallback to localhost
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devops_project';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));