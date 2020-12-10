const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Bee = require('../lib/models/bees');
const Flower = require('../lib/models/flowers');
const pool = require('../lib/utils/pool');

describe('app.js endpoint', () => {
  beforeEach(() => pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8')));

  afterAll(() => pool.end());

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

    const bees = await Promise.all([
      { beeName: 'Gertrude', buzzStyle: 'sassy', fuzzyFactor: 24, flowerId: flower.id },
      { beeName: 'Bobo', buzzStyle: 'class', fuzzyFactor: 8, flowerId: flower.id },
      { beeName: 'Carlo', buzzStyle: 'jazzy', fuzzyFactor: 16, flowerId: flower.id }
    ].map(bee => Bee.insert(bee)));

    const res = await request(app)
      .get(`/api/v1/flowers/${flower.id}`);

    expect(res.body).toEqual({
      ...flower,
      bees: expect.arrayContaining(bees)
    });
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

  it('delete one flower via DELETE', async() => {
    const flower = await Flower.insert(
      {
        color: 'purple',
        fragrance: 'musky',
        petals: 7
      }
    );

    const res = await request(app)
      .delete(`/api/v1/flowers/${flower.id}`);

    expect(res.body).toEqual(flower);
  });


  // Bee tests begin

  it('create one new bee via POST', async() => {
    const flower = await Flower.insert(
      {
        color: 'purple',
        fragrance: 'musky',
        petals: 7
      }
    );
  
    const res = await request(app)
      .post('/api/v1/bees')
      .send({
        beeName: 'Gertrude',
        buzzStyle: 'sassy',
        fuzzyFactor: 24,
        flowerId: flower.id
        
      });

    expect(res.body).toEqual({
      id: '1',
      beeName: 'Gertrude',
      buzzStyle: 'sassy',
      fuzzyFactor: 24,
      flowerId: flower.id
    
    });
  });

  it('get all bees via GET', async() => {
    const bees = await Promise.all([
      {
        beeName: 'Gertrude',
        buzzStyle: 'sassy',
        fuzzyFactor: 24,
        flowerId: Bee.flower_id
      },
      {
        beeName: 'Bobo',
        buzzStyle: 'classy',
        fuzzyFactor: 8,
        flowerId: Bee.flower_id
      },
      {
        beeName: 'Carlo',
        buzzStyle: 'jazzy',
        fuzzyFactor: 16,
        flowerId: Bee.flower_id
      }
    ].map(bee => Bee.insert(bee)));

    const res = await request(app)
      .get('/api/v1/bees');

    expect(res.body).toEqual(expect.arrayContaining(bees));
    expect(res.body).toHaveLength(bees.length);
  });






  it('get one bee via GET', async() => {
    const bee = await Bee.insert(
      {
        beeName: 'Carlo',
        buzzStyle: 'jazzy',
        fuzzyFactor: 16
      }
    );

    const res = await request(app)
      .get(`/api/v1/bees/${bee.id}`);

    expect(res.body).toEqual(bee);
  });





  it('update one bee via PUT', async() => {
    const bee = await Bee.insert(
      {
        beeName: 'Bobo',
        buzzStyle: 'classy',
        fuzzyFactor: 8
      }
    );

    const res = await request(app)
      .put(`/api/v1/bees/${bee.id}`)
      .send(
        {
          beeName: 'Bobo',
          buzzStyle: 'snazzy',
          fuzzyFactor: 8
        }
      );

    expect(res.body).toEqual(
      {
        ...bee,
        beeName: 'Bobo',
        buzzStyle: 'snazzy',
        fuzzyFactor: 8
      }
    );
  });





  it('delete one bee via DELETE', async() => {
    const bee = await Bee.insert(
      {
        beeName: 'Bobo',
        buzzStyle: 'classy',
        fuzzyFactor: 8
      }
    );

    const res = await request(app)
      .delete(`/api/v1/bees/${bee.id}`);

    expect(res.body).toEqual(bee);
  });

});
