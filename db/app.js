const express = require('express');
const app = express();
const {
    getCategories
} = require('../db/controllers/categoryControllers');
const { 
    handle500Errors, 
    handleCustomErrors,
    handle400Errors 
} = require('./controllers/error-handling-controllers')

app.get('/api/categories', getCategories)

app.use(handle400Errors)

app.use(handleCustomErrors)

app.use(handle500Errors)

module.exports = app