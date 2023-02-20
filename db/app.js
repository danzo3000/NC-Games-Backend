const express = require('express');
const app = express();
const {
    getCategories
} = require('../db/controllers/categoryControllers')

app.get('/api/categories', getCategories)

module.exports = app