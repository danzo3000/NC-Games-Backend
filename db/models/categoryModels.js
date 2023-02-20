const db = require('../connection');

exports.selectCategories = () => {
    return db
        .query(`
        SELECT * FROM categories;`).then((response)=>{
           const categories = response.rows;
           if (!categories) {
            return Promise.reject({status: 404, msg: "Table not found"})
           }
           return categories
        })
}