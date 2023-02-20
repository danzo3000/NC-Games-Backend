const request = require('supertest');
const seed = require('../db/seeds/seed');
const app = require('../db/app');
const connection = require('../db/connection');
const testData = require('../db/data/test-data/index');

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
    })
})