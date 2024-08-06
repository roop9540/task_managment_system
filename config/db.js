// config/db.js
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require('mongoose');

const connectDB = async () => {
    console.log(process.env.MONGO_URI)
    try {
        await mongoose.connect(process.env.MONGO_URI, { writeConcern: { w: 'majority' } });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
