require('dotenv').config();
const express = require('express');
const app = express.json();
app.use(express.json());



module.exports = app;
