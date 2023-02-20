exports.handle500Errors = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: "Server error"})
}

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    }
    else {
        next(err)
    }
}

exports.handle400Errors = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({msg: "Bad request"})
    }
    else {
        next(err)
    }
}