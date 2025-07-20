const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Claim points for a user
router.post('/claim', async (req, res) => {
    try {
        const { userId } = req.body;

        // Generate random points between 1 and 10
        const randomPoints = Math.floor(Math.random() * 10) + 1;

        // Find and update user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.totalPoints += randomPoints;
        await user.save();

        // Create claim history
        const claimHistory = new ClaimHistory({
            userId: user._id,
            userName: user.name,
            pointsClaimed: randomPoints
        });
        await claimHistory.save();

        res.json({
            user,
            pointsClaimed: randomPoints,
            claimHistory
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get claim history
router.get('/history', async (req, res) => {
    try {
        const history = await ClaimHistory.find()
            .sort({ claimedAt: -1 })
            .limit(50);
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;