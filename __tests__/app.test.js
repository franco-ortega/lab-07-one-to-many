const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Flower = require('../lib/models/flowers');
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

  it('get all flowers via GET', async() => {
    const flowers = await Promise.all([
      {
        color: 'burgandy',
        fragrance: 'sweet',
        petals: 12
      },
      {
        color: 'sky blue',
        fragrance: 'spicy',
        petals: 20
      },
      {
        color: 'purple',
        fragrance: 'musky',
        petals: 7
      }
    ].map(flower => Flower.insert(flower)));

    const res = await request(app)
      .get('/api/v1/flowers');

    expect(res.body).toEqual(expect.arrayContaining(flowers));
    expect(res.body).toHaveLength(flowers.length);
  });

  it('get one flower via GET', async() => {
    const flower = await Flower.insert(
      {
        color: 'purple',
        fragrance: 'musky',
        petals: 7
      }
    );

    const res = await request(app)
      .get(`/api/v1/flowers/${flower.id}`);

    expect(res.body).toEqual(flower);
  });

  it('update one flower via PUT', async() => {
    const flower = await Flower.insert(
      {
        color: 'purple',
        fragrance: 'musky',
        petals: 7
      }
    );

    const res = await request(app)
      .put(`/api/v1/flowers/${flower.id}`)
      .send(
        {
          color: 'purple',
          fragrance: 'sweet',
          petals: 7
        }
      );

    expect(res.body).toEqual(
      {
        ...flower,
        color: 'purple',
        fragrance: 'sweet',
        petals: 7
      }
    );
  });


});

