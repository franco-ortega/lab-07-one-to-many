const express = require('express');
const Bee = require('./models/bees');
const Flower = require('./models/flowers');
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  console.log('Smell the flowers');
  res.send({ smell: 'the flowers' });
});

app.post('/api/v1/flowers', (req, res, next) => {
  Flower
    .insert(req.body)
    .then(flower => res.send(flower))
    .catch(next);
});

app.get('/api/v1/flowers', (req, res, next) => {
  Flower
    .find()
    .then(flower => res.send(flower))
    .catch(next);
});

app.get('/api/v1/flowers/:id', (req, res, next) => {
  Flower
    .findById(req.params.id)
    .then(flower => res.send(flower))
    .catch(next);
});

app.put('/api/v1/flowers/:id', (req, res, next) => {
  Flower
    .update(req.params.id, req.body)
    .then(flower => res.send(flower))
    .catch(next);
});

app.delete('/api/v1/flowers/:id', (req, res, next) => {
  Flower
    .delete(req.params.id)
    .then(flower => res.send(flower))
    .catch(next);
});
  
//Bee endpoints
app.post('/api/v1/bees', (req, res, next) => {
  Bee
    .insert(req.body)
    .then(bee => res.send(bee))
    .catch(next);
});
  


module.exports = app;
