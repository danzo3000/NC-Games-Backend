const { selectCategories, selectReviews, selectReviewByID } = require('../models/gamesModels')

exports.getCategories = (req, res, next) => {
    selectCategories().then((categories)=> {
        res.status(200).send({categories})
    }).catch((err)=> {
        next(err)
    })
}

exports.getReviews = (req, res, next) => {
    selectReviews().then((reviews)=> {
        res.status(200).send({reviews})
    })
}

exports.getReviewByID = (req, res, next) => {
    const review_id = req.params.review_id;
    selectReviewByID(review_id).then((review)=> {
        res.status(200).send({review})
    }).catch((error)=> {
        next(error)
    })
}

