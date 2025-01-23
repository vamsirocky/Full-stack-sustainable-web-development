const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();
const PORT = 5001;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


// Routes
app.use('/api', userRoutes); // Prefix all user routes with '/api'

// Catch-All Route for Undefined Routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
