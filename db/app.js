const express = require('express');
const { handle500Errors, handle400Errors, handleCustomErrors} = require('./controllers/errorHandlingControllers');
const app = express();
const {
    getCategories,
    getReviews,
    getReviewByID
} = require('./controllers/gamesControllers');

app.get('/api/categories', getCategories)

app.get('/api/reviews', getReviews)

app.get('/api/reviews/:review_id', getReviewByID)

app.use(handleCustomErrors)
app.use(handle400Errors)
app.use(handle500Errors)

module.exports = app