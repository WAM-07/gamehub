const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please add a rating between 1 and 5']
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment'],
        maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    game: {
        type: mongoose.Schema.ObjectId,
        ref: 'Game',
        required: true
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

// Prevent user from submitting more than one review per game
ReviewSchema.index({ game: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);
