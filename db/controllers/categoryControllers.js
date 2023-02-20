const { selectCategories } = require('../models/categoryModels')

exports.getCategories = (req, res, next) => {
    selectCategories().then((categories)=> {
        res.status(200).send({categories})
    }).catch((err)=> {
        console.log(err + " <<ERROR LOG")
        next(err)
    })
}