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

exports.selectReviews = (category, sort_by, order) => {
  if (!sort_by) {
    sort_by = "created_at";
  }

  if (!order) {
    order = "desc";
  }

  let queryStringStart = `SELECT reviews.*, CAST(COUNT(comments.review_id) AS INT) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id`;

  if (category) {
    queryStringStart += ` WHERE category = ${category}`;
  }
  const validOrderBy = [
    "title",
    "designer",
    "owner",
    "review_body",
    "category",
    "created_at",
    "votes",
  ];
  const validOrder = ["asc", "desc"];

  let queryStringEnd = " GROUP BY reviews.review_id";

  if (validOrderBy.includes(sort_by) && validOrder.includes(order)) {
    queryStringEnd += ` ORDER BY ${sort_by} ${order};`;
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  const fullQueryString = queryStringStart.concat(queryStringEnd);
  console.log(fullQueryString, "<<fullQueryString");

  return db.query(fullQueryString).then(({ rows }) => {
    if (rows.length === 1) {
      return rows[0];
    } else {
      return rows;
    }
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

exports.updateReviewByID = (inc_votes, review_id) => {
  return db
    .query(
      `
      UPDATE reviews
      SET
      votes = votes + $1
      WHERE review_id = $2
      RETURNING *;`,
      [inc_votes, review_id]
    )
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({ status: 404, msg: "Review_id not found" });
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
      if (!rows) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        return users;
      }
    });
};
