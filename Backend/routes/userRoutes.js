const express = require('express');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body); // Create a new user from request body
    await user.save(); // Save the user to the database
    res.status(201).send(user); // Return the created user
  } catch (error) {
    res.status(400).send({ error: error.message }); // Handle errors
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from the database
    res.send(users); // Return the list of users
  } catch (error) {
    res.status(500).send({ error: error.message }); // Handle errors
  }
});

module.exports = router; // Export the router
