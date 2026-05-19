const express = require('express');
const mongoose = require('mongoose');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(express.json());

app.use('/api/notifications', notificationRoutes);

// Health check endpoint
app.get('/health', (req, res) => res.json({ status: 'Notification Service is running' }));

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devops_project';
mongoose.connect(mongoURI)
    .then(() => console.log('Notification Service: MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));
