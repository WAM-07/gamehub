const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a game title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    genre: {
        type: String,
        required: [true, 'Please add a genre'],
        enum: [
            'Action',
            'Adventure',
            'RPG',
            'Simulation',
            'Strategy',
            'Sports',
            'Puzzle',
            'Other'
        ]
    },
    developer: {
        type: String,
        default: 'Independent'
    },
    imageUrl: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ],
        default: 'no-photo.jpg'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Game', GameSchema);
