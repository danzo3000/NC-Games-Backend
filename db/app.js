const express = require('express');
const app = express();
const {
    getCategories
} = require('../db/controllers/categoryControllers');


app.get('/api/categories', getCategories)

app.use((err, req, res, next)=> {
    console.log(err);
    res.status(500).send({msg: "Server error"})
})

module.exports = app