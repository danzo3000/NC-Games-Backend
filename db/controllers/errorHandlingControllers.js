exports.handle500Errors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server error" });
};

exports.handle400Errors = (err, req, res, next) => {
  console.log(err);
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "Missing required field" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Not found" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
};

exports.handleBadPaths = (req, res, next) => {
  res.status(404).send("Path not found");
};
