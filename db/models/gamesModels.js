const db = require('../connection');


exports.selectCategories = () => {
    return db
        .query(`
        SELECT * FROM categories;`).then((response)=>{
           const categories = response.rows;
           
           return categories
        })
}

exports.selectReviews = () => {
    return db 
        .query(`SELECT reviews.*, CAST(COUNT(comments.review_id) AS INT) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;
        `).then((response)=>{
            const reviews = response.rows

            return reviews
        })
}

exports.selectReviewByID = (review_id) => {
    return db
        .query(`
        SELECT * FROM reviews WHERE reviews.review_id = $1`, [review_id]).then(({rows})=> {
            const review = rows[0];
            if (!rows[0]) {
                return Promise.reject({status: 404, msg: "Not Found"})
            }
            return review
        })
}
