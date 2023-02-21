const express = require('express');
const { handle500Errors } = require('./controllers/errorHandlingControllers');
const app = express();
const {
    getCategories,
    getReviews
} = require('./controllers/gamesControllers');
const {handle500Errors} = require('../db/controllers/errorHandlingControllers')

app.get('/api/categories', getCategories)

app.get('/api/reviews', getReviews)


app.use(handle500Errors)

module.exports = app