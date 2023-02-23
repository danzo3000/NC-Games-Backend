const db = require("../connection");
const { checkReviewExists } = require("../seeds/utils");

exports.selectCategories = () => {
  return db
    .query(
      `
        SELECT * FROM categories;`
    )
    .then((response) => {
      const categories = response.rows;

      return categories;
    });
};

exports.selectReviews = () => {
  return db
    .query(
      `SELECT reviews.*, CAST(COUNT(comments.review_id) AS INT) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;
        `
    )
    .then((response) => {
      const reviews = response.rows;

      return reviews;
    });
};

exports.selectReviewByID = (review_id) => {
  return db
    .query(
      `
        SELECT * FROM reviews WHERE reviews.review_id = $1`,
      [review_id]
    )
    .then(({ rows }) => {
      const review = rows[0];
      if (!rows[0]) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return review;
    });
};

exports.selectCommentsByReviewID = (review_id) => {
  return db
    .query(
      `
        SELECT * 
        FROM comments 
        WHERE comments.review_id = $1
        ORDER BY comments.created_at DESC`,
      [review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return checkReviewExists(review_id);
      } else {
        return rows;
      }
    })
    .then((result) => {
      return result;
    });
};
exports.insertCommentByReviewID = (author, body, review_id) => {
  return db
    .query(
      ` INSERT INTO comments (author, body, review_id)
        VALUES (
           $1, $2, $3
        ) RETURNING *;`,
      [author, body, review_id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({ status: 404, msg: "Review ID not found" });
      } else {
        return rows[0];
      }
    });
};

exports.selectUsers = () => {
  return db
    .query(
      `SELECT *
      FROM users;`
    )
    .then(({ rows }) => {
      const users = rows;
      return users;
    });
};
