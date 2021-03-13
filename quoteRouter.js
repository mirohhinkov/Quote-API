const express = require('express');
const quoteController = require('./quoteController');

const router = express.Router();

router
  .route('/')
  .get(quoteController.getAllQuotes)
  .post(quoteController.postQuote);
router
  .route('/random')
  .get(quoteController.getQuote);

module.exports = router;
