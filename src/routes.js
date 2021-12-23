const express = require('express')

const CalendarController = require('./Controllers/CalendarController')

const routes = express.Router()


routes.get('/', (request, response) => response.send('Hello!! This is a Interview test!'))
routes.get('/calendar', CalendarController.index)

module.exports = routes