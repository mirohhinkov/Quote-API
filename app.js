const express = require('express');
const morgan = require('morgan');
const quoteRouter = require('./quoteRouter');

const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/quotes/', quoteRouter);

module.exports = app;
