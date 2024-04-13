const {Rating, sequelize} = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController {
    async upsertRating(req, res, next) {
        try {
            const {userId, itemId, rating} = req.body;
            const existingRating = await Rating.findOne({where: {userId, itemId}});
            if (existingRating) {
                existingRating.rating = rating;
                await existingRating.save();
            } else {
                await Rating.create({userId, itemId, rating});
            }
            res.status(200).send("Rating updated successfully");
        } catch (error) {
            next(error);
        }
    }

    async getAverageRating(req, res, next) {
        try {
            const {itemId} = req.params;
            const avgRating = await Rating.findAll({
                where: {itemId},
                attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'averageRating']],
                raw: true,
            });
            res.json({averageRating: avgRating[0].averageRating || 0});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RatingController();