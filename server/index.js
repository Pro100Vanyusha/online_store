require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHendler =require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const ratingRouter = require('./routes/ratingRouter');

const PORT = process.env.PORT || 5000


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use('/api', ratingRouter);

// Обробка помилок, останній Middleware !
app.use(errorHendler)
const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,() => console.log(`Server started on port ${PORT}`))
    }catch (e) {
        console.log(e)
    }
}

start()