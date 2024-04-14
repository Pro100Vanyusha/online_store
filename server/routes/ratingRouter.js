const Router = require('express');
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.post('/rating', authMiddleware, ratingController.createRating);
router.get('/rating/average/:deviceId', ratingController.getAverageRating);

module.exports = router;