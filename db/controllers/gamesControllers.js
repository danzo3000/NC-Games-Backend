const {
  selectCategories,
  selectReviews,
  selectReviewByID,
  selectCommentsByReviewID,
  updateReviewByID,
} = require("../models/gamesModels");

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  selectReviews().then((reviews) => {
    res.status(200).send({ reviews });
  });
};

exports.getReviewByID = (req, res, next) => {
  const review_id = req.params.review_id;
  selectReviewByID(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((error) => {
      next(error);
    });
};

exports.patchReviewByID = (req, res, next) => {
  const { inc_votes } = req.body;
  const { review_id } = req.params;
  updateReviewByID(inc_votes, review_id)
    .then((review) => {
      res.status(201).send({ review });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getCommentsByReviewID = (req, res, next) => {
  const review_id = req.params.review_id;
  selectCommentsByReviewID(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
