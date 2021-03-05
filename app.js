const express = require('express')
require('dotenv').config()
const multer = require('multer')
const { noApi } = require('./controller/otros')
const { dbConnection } = require('./database/config')

const app = express()
const upload = multer()

dbConnection().then()

app.use(express.json())
app.use(upload.any())

app.use('/api', require('./routers/index'))

app.use(noApi)

module.exports = app
