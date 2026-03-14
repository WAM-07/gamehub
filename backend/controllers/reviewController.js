const Review = require('../models/Review');
const Game = require('../models/Game');

// @desc    Get reviews for a game
// @route   GET /api/v1/games/:gameId/reviews
// @route   GET /api/v1/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
    try {
        let query;

        if (req.params.gameId) {
            query = Review.find({ game: req.params.gameId });
        } else {
            query = Review.find().populate({
                path: 'game',
                select: 'title description'
            });
        }

        query = query.populate({
            path: 'user',
            select: 'username'
        });

        const reviews = await query;

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Add review
// @route   POST /api/v1/games/:gameId/reviews
// @access  Private
exports.addReview = async (req, res, next) => {
    try {
        req.body.game = req.params.gameId;
        req.body.user = req.user.id;

        const game = await Game.findById(req.params.gameId);

        if (!game) {
            return res.status(404).json({ success: false, error: 'No game found with the id of ' + req.params.gameId });
        }

        const review = await Review.create(req.body);

        res.status(201).json({
            success: true,
            data: review
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
