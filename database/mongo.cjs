const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { startTestIndexWatcher } = require('../watchers/IndexWatcher');
const { startSurveyResponseWatcher } = require('../watchers/resultWatcher');

dotenv.config({ path: path.join(__dirname, '../.env') });

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error('❌ MONGO_URI missing from .env');
    process.exit(1);
}

async function connectDB() {
    try {
        await mongoose.connect(uri); // ✅ No deprecated options needed in v7+
        console.log('✅ MongoDB connected successfully');
        startTestIndexWatcher();
        startSurveyResponseWatcher()
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        setTimeout(connectDB, 5000); // Retry every 5 seconds
    }
}

mongoose.connection.on('disconnected', () => console.warn('⚠️ MongoDB disconnected'));
mongoose.connection.on('reconnected', () => console.log('🔄 MongoDB reconnected'));
mongoose.connection.on('error', (err) => console.error('❌ MongoDB error:', err));

connectDB();

module.exports = mongoose;