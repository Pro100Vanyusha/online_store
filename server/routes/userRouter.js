const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const austhMiddleware = require('../middleware/authMiddleware')

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', austhMiddleware, UserController.check)

module.exports = router
