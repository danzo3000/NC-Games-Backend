const db = require('../connection');

exports.selectCategories = () => {
    return db
        .query(`
        SELECT * FROM categories;`).then((response)=>{
            return (categories = response.rows)
        })
}