const express = require('express');
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



module.exports = app;
