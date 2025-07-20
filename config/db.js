const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURL = 'mongodb+srv://nirbhayhiwse37:1RODRjmR3crXLvRu@to-do.dlfgjhe.mongodb.net/?retryWrites=true&w=majority&appName=To-Do';

        await mongoose.connect(mongoURL);

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;