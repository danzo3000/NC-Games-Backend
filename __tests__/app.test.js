const request = require('supertest');
const seed = require('../db/seeds/seed');
const app = require('../db/app');
const connection = require('../db/connection');
const testData = require('../db/data/test-data/index');
require('jest-sorted')

beforeEach(()=> {
    return seed(testData)
});

afterAll(()=> {
    return connection.end()
});

describe('app', () => {
    describe('/api/categories', () => {
        it('200: GET - should return an array of categories objects', () => {
            return request(app)
                .get('/api/categories')
                .expect(200)
                .then(({body})=> {
                expect(body.categories).toHaveLength(4);
                body.categories.forEach((category)=> {
                     expect(category).toHaveProperty('slug', expect.any(String));
                     expect(category).toHaveProperty('description', expect.any(String))
                    })
             })
        })
    })
    describe('/api/reviews', () => {
        it('200: GET - should return an array of review objects', () => {
            return request(app)
                .get('/api/reviews')
                .expect(200)
                .then(({body})=> {
                expect(body.reviews).toHaveLength(13);
                body.reviews.forEach((review)=> {
                    expect(review).toHaveProperty('review_id', expect.any(Number));
                    expect(review).toHaveProperty('owner', expect.any(String));
                    expect(review).toHaveProperty('title', expect.any(String)); 
                    expect(review).toHaveProperty('designer', expect.any(String)); expect(review).toHaveProperty('owner', expect.any(String)); 
                    expect(review).toHaveProperty('category', expect.any(String));
                    expect(review).toHaveProperty('review_img_url', expect.any(String));
                    expect(review).toHaveProperty('review_body', expect.any(String));
                    expect(review).toHaveProperty('created_at', expect.any(String));
                    expect(review).toHaveProperty('votes', expect.any(Number));
                   expect(review).toHaveProperty('comment_count', expect.any(Number))
                })
                })
        })
        it('200: GET - should return an array of review objects sorted by date in descending order', () => {
            return request(app)
                    .get('/api/reviews')
                    .expect(200)
                    .then(({body})=> {
                    console.log(body.reviews)
                    expect(body.reviews).toHaveLength(13);
                    expect(body.reviews).toBeSorted({
                        key: 'created_at',
                        descending: true
            })
        });
                    
       })
    })
    describe('/api/reviews/:review_id', () => {
        it('200: GET - should respond with a single review object according to the review_id parameter', () => {
            return request(app)
                    .get('/api/reviews/2')
                    .expect(200)
                    .then(({body})=> {
                    const review = body.review;
                    expect(review).toHaveProperty('review_id', expect.any(Number));
                    expect(review).toHaveProperty('owner', expect.any(String));
                    expect(review).toHaveProperty('title', expect.any(String)); 
                    expect(review).toHaveProperty('designer', expect.any(String)); 
                    expect(review).toHaveProperty('category', expect.any(String));
                    expect(review).toHaveProperty('review_img_url', expect.any(String));
                    expect(review).toHaveProperty('review_body', expect.any(String));
                    expect(review).toHaveProperty('created_at', expect.any(String));
                    expect(review).toHaveProperty('votes', expect.any(Number));
             })
        })
        it('400: Bad request - should respond with an error message of Bad Request when a user inputs an invalid parameter', () => {
            return request(app)
                    .get('/api/reviews/not-a-valid-review_id')
                    .expect(400)
                    .then(({body})=> {
                        expect(body.msg).toBe("Bad Request")
                    })
        })
        it('404: Not found - should respond with an error message of Not Found when a user inputs a valid but non-existent parameter', () => {
            return request(app)
                    .get('/api/reviews/5000')
                    .expect(404)
                    .then(({body})=> {
                     expect(body.msg).toBe("Not Found")
                    })
        })
     })
     describe('/api/reviews/:review_id/comments', () => {
        it('200: GET - should return an array of comments according to the review_id parameter', () => {
            return request(app)
                    .get('/api/reviews/2/comments')
                    .expect(200)
                    .then(({body})=> {
                    const comments = body.comments;
                    expect(comments).toHaveLength(3);
                    comments.forEach((comment)=> {
                    expect(comment).toHaveProperty('comment_id', expect.any(Number));
                    expect(comment).toHaveProperty('votes', expect.any(Number));
                    expect(comment).toHaveProperty('created_at', expect.any(String));
                    expect(comment).toHaveProperty('author', expect.any(String));
                    expect(comment).toHaveProperty('body', expect.any(String));
                    expect(comment).toHaveProperty('review_id', expect.any(Number));
                })
            })
        })
        it('200: GET - should return an array of comments according to the review_id parameter sorted by date in descending order', () => {
            return request(app)
                .get('/api/reviews/3/comments')
                .expect(200)
                .then(({body})=> {
                console.log(body.comments)
                expect(body.comments).toHaveLength(3);
                expect(body.comments).toBeSorted({
                    key: 'created_at',
                    descending: true
                })
            })
        })
        //CONTINUE ON THIS TEST ON WEDS
        it('200: GET - should return an empty array if the review_id exists but has no comments', () => {
            return request(app)
                .get('/api/reviews/1/comments')
                .expect(200)
                .then(({body})=> {
                expect(body.comments).toEqual([]);
                })
        })
        it('400: GET - should return an error message of Bad Request when a user input an invalid parameter', () => {
            return request(app)
                .get('/api/reviews/not-a-valid-input/comments')
                .expect(400)
                .then(({body})=> {
                expect(body.msg).toBe("Bad Request")
                })
        })
        it('404: GET - should return an error message of Not Found when a user inputs a valid but non-existent parameter', () => {
            return request(app)
                .get('/api/reviews/5000/comments')
                .expect(404)
                .then(({body})=> {
                expect(body.msg).toBe("Review ID not found")
                })
        })
     })
})

