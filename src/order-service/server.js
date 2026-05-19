const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/health', (req, res) => res.json({ status: 'Order Service is running' }));

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devops_project';
mongoose.connect(mongoURI)
    .then(() => console.log('Order Service: MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
