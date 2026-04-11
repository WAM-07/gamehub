const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const cookieParser = require('cookie-parser');

// Load env vars — works regardless of CWD (root or backend/)
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const games = require('./routes/game');
const reviews = require('./routes/review');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/games', games);
app.use('/api/v1/reviews', reviews);

// Se
// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    // 1. Static folder for assets
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // 2. The Catch-all: Using a raw RegExp /.*/ bypasses the strict string parser entirely!
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}
const PORT = process.env.PORT || 5000;

// Explicitly bind to 0.0.0.0 to allow Docker bridge networking
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// DevOps Assignment Update: Fixed wildcard and 0.0.0.0 binding
