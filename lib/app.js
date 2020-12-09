require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res, next) => {
  console.log('Smell the flowers');
  res.send({ smell: 'the flowers' });
});



module.exports = app;
