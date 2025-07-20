const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users with rankings
router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({ totalPoints: -1 });

        // Add rank to each user
        const usersWithRank = users.map((user, index) => ({
            ...user.toObject(),
            rank: index + 1
        }));
 
        
        res.json(usersWithRank);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new user
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name });
        await user.save();

        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Initialize default users
router.post('/initialize', async (req, res) => {
    try {
        const defaultUsers = [
            'Rahul', 'Kamal', 'Sanak', 'John', 'Alice',
            'Bob', 'Charlie', 'David', 'Eve', 'Frank'
        ];

        const existingUsers = await User.find();
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Users already initialized' });
        }

        const users = await User.insertMany(
            defaultUsers.map(name => ({ name }))
        );

        res.status(201).json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;