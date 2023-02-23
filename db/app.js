const express = require("express");
const {
  handle500Errors,
<<<<<<< HEAD
  handlePSQLErrors,
=======
  handle400Errors,
>>>>>>> main
  handleCustomErrors,
} = require("./controllers/errorHandlingControllers");
const app = express();
const {
  getCategories,
  getReviews,
  getReviewByID,
  getCommentsByReviewID,
<<<<<<< HEAD
  patchReviewByID,
=======
  postCommentByReviewID,
>>>>>>> main
} = require("./controllers/gamesControllers");

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewByID);

<<<<<<< HEAD
app.patch("/api/reviews/:review_id", patchReviewByID);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
=======
app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);

app.post("/api/reviews/:review_id/comments", postCommentByReviewID);

app.use(handleCustomErrors);
app.use(handle400Errors);
>>>>>>> main
app.use(handle500Errors);

module.exports = app;
