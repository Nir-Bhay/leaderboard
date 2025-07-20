const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();
// const FRONTEND_URL = const FRONTEND_URL = https://points-leaderboard-system.vercel.app/;;
// Middleware
app.use(cors({
   
    // 
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/claims', require('./routes/claims'));

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Leaderboard API is running!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});