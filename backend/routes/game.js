const express = require('express');
const {
    getGames,
    getGame,
    createGame,
    updateGame,
    deleteGame
} = require('../controllers/gameController');

// Include other resource routers
const reviewRouter = require('./review');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:gameId/reviews', reviewRouter);

router
    .route('/')
    .get(getGames)
    .post(protect, createGame);

router
    .route('/:id')
    .get(getGame)
    .put(protect, updateGame)
    .delete(protect, deleteGame);

module.exports = router;
