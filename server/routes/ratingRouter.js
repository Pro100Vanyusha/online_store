const Router = require('express');
const ratingController = require('../controllers/ratingController');
const router = new Router();

router.post('/rating', ratingController.upsertRating);
router.get('/rating/:itemId', ratingController.getAverageRating);

module.exports = router;