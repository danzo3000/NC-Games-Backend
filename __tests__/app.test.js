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
})