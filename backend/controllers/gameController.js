const Game = require('../models/Game');

// @desc    Get all games
// @route   GET /api/v1/games
// @access  Public
exports.getGames = async (req, res, next) => {
    try {
        const games = await Game.find().populate({
            path: 'user',
            select: 'username bio'
        });

        res.status(200).json({
            success: true,
            count: games.length,
            data: games
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get single game
// @route   GET /api/v1/games/:id
// @access  Public
exports.getGame = async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.id).populate({
            path: 'user',
            select: 'username bio'
        });

        if (!game) {
            return res.status(404).json({ success: false, error: 'Game not found' });
        }

        res.status(200).json({
            success: true,
            data: game
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Create new game
// @route   POST /api/v1/games
// @access  Private
exports.createGame = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.user = req.user.id;

        const game = await Game.create(req.body);

        res.status(201).json({
            success: true,
            data: game
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update game
// @route   PUT /api/v1/games/:id
// @access  Private
exports.updateGame = async (req, res, next) => {
    try {
        let game = await Game.findById(req.params.id);

        if (!game) {
            return res.status(404).json({ success: false, error: 'Game not found' });
        }

        // Make sure user is game owner
        if (game.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'User not authorized to update this game' });
        }

        game = await Game.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: game
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete game
// @route   DELETE /api/v1/games/:id
// @access  Private
exports.deleteGame = async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.id);

        if (!game) {
            return res.status(404).json({ success: false, error: 'Game not found' });
        }

        // Make sure user is game owner
        if (game.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'User not authorized to delete this game' });
        }

        await game.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
