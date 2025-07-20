const mongoose = require('mongoose');

const ClaimHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    pointsClaimed: {
        type: Number,
        required: true
    },
    claimedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ClaimHistory', ClaimHistorySchema);