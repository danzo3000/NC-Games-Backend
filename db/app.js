const express = require("express");
const {
  handle500Errors,
  handle400Errors,
  handleCustomErrors,
} = require("./controllers/errorHandlingControllers");
const app = express();
const {
  getCategories,
  getReviews,
  getReviewByID,
  getCommentsByReviewID,
  patchReviewByID,
} = require("./controllers/gamesControllers");

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewByID);

app.patch("/api/reviews/:review_id", patchReviewByID);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);

app.use(handleCustomErrors);
app.use(handle400Errors);
app.use(handle500Errors);

module.exports = app;
