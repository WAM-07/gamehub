const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const path = require('path');
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
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/games', games);
app.use('/api/v1/reviews', reviews);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../frontend/dist'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
