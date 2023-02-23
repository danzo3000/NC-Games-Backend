const {
  selectCategories,
  selectReviews,
  selectReviewByID,
  selectCommentsByReviewID,
  updateReviewByID,
  insertCommentByReviewID,
  selectUsers,
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
  let { category, sort_by, order } = req.query;
  const validQueries = ["category", "order", "sort_by"];
  const queryKeys = Object.keys(req.query);
  if (queryKeys.length !== 0) {
    if (!validQueries.includes(queryKeys[0])) {
      return res.status(400).send({ msg: "Invalid query" });
    }
  }

  selectReviews(category, sort_by, order)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((error) => {
      next(error);
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
      res.status(200).send({ review });
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
      next(error);
    });
};

exports.postCommentByReviewID = (req, res, next) => {
  const { username, body } = req.body;
  const { review_id } = req.params;
  insertCommentByReviewID(username, body, review_id)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((error) => {
      next(error);
    });
};
