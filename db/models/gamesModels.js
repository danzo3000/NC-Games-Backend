const db = require("../connection");
const format = require("pg-format");
const { checkReviewExists, checkCategoryExists } = require("../seeds/utils");

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

  let validQueries = [];
  let queryStringStart = `SELECT reviews.*, CAST(COUNT(comments.review_id) AS INT) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id`;

  if (category) {
    validQueries.push(category);
    queryStringStart += ` WHERE category = $1`;
  }

  let queryStringEnd = ` GROUP BY reviews.review_id`;

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

  if (validOrderBy.includes(sort_by)) {
    queryStringEnd += ` ORDER BY ${sort_by}`;
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  if (validOrder.includes(order)) {
    queryStringEnd += ` ${order};`;
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  const fullQueryString = queryStringStart.concat(queryStringEnd);

  return db.query(fullQueryString, validQueries).then(({ rows }) => {
    if (rows.length === 0) {
      return checkCategoryExists(category);
    } else if (rows.length === 1) {
      return rows[0];
    } else {
      return rows;
    }
  });
};

exports.selectReviewByID = (review_id) => {
  return db
    .query(
      `SELECT reviews.*, CAST(COUNT(comments.review_id) AS INT) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id = $1 GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;
        `,
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

exports.removeComments = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment_id Not Found" });
      }
    });
};
