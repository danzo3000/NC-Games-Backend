const { 
    selectCategories,
    selectReviews 
} = require('../models/gamesModels')

exports.getCategories = (req, res, next) => {
    selectCategories().then((categories)=> {
        res.status(200).send({categories})
    }).catch((err)=> {
        next(err)
    })
}

exports.getReviews = (req, res, next) => {
    selectReviews().then((reviews)=> {
        console.log(reviews);
        res.status(200).send({reviews})
    }).catch((err)=> {
        next(err)
    })
}