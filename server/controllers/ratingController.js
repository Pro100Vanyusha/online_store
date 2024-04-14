const {Rating} = require('../models/models');
const authMiddleware = require('../middleware/authMiddleware');
class RatingController {
    async createRating(req, res) {
        try {
            const {rate, deviceId} = req.body;
            const userId = req.user.id; // Використання ID зареєстрованого користувача з JWT

            // Перевіряємо, чи існує вже рейтинг від цього користувача для цього пристрою
            const existingRating = await Rating.findOne({ where: {userId, deviceId} });

            if (existingRating) {
                // Якщо рейтинг вже існує, видаляємо його
                await existingRating.destroy();
            }

            // Створюємо новий рейтинг
            const rating = await Rating.create({rate, deviceId, userId});

            return res.json(rating);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    async getAverageRating(req, res) {
        try {
            const {deviceId} = req.params;
            const ratings = await Rating.findAll({where: {deviceId}});
            const averageRating = ratings.reduce((acc, cur) => acc + cur.rate, 0) / ratings.length;
            return res.json({average: averageRating.toFixed(1)});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = new RatingController();