const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');

describe('app.js endpoint', () => {
  beforeEach(() => pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8')));

  afterAll(() => pool.end());

  it('sample GET test to check connection', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ smell: 'the flowers' });
      });
  });

  it('create one new flower via POST', async() => {
    const res = await request(app)
      .post('/api/v1/flowers')
      .send({
        color: 'burgandy',
        fragrance: 'sweet',
        petals: 12
      });

    expect(res.body).toEqual({
      id: '1',
      color: 'burgandy',
      fragrance: 'sweet',
      petals: 12
    });
  });


});

