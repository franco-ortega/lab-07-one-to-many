const request = require('supertest');
const app = require('../lib/app');

describe('app.js endpoint', () => {

  it('sample GET test to check connection', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ smell: 'the flowers' });
      });
  });
});

