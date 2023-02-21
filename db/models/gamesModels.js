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

