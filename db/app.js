const express = require("express");
const {
  handle500Errors,
  handle400Errors,
  handleCustomErrors,
  handleBadPaths,
} = require("./controllers/errorHandlingControllers");
const app = express();
const {
  getCategories,
  getReviews,
  getReviewByID,
  getCommentsByReviewID,
  postCommentByReviewID,
  getUsers,
} = require("./controllers/gamesControllers");

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewByID);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);

app.post("/api/reviews/:review_id/comments", postCommentByReviewID);

app.get("/api/users", getUsers);

app.use("*", handleBadPaths); //keep between the controllers and error handlers

app.use(handleCustomErrors);
app.use(handle400Errors);
app.use(handle500Errors);

module.exports = app;
