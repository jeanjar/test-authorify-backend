const express = require('express')
const routes = require('./routes')
const ExceptionHandler = require('./Middlewares/ExceptionHandler')
const app = express()

app.use(express.json())
app.use(routes)
app.use(ExceptionHandler)

module.exports = app