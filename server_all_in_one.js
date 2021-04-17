const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');
const PORT = process.env.PORT || 4001;

const getAllQuotes = (req, res) => {
  res.status(200).json({
    status: 'successfil',
    data: {
      quotes,
    },
  });
};

const getQuote = (req, res) => {
  const quote = getRandomElement(quotes);
  res
    .status(200)
    .json({ status: 'successful', data: { quote } });
};

const postQuote = (req, res) => {
  const text = req.body.text;
  const author = req.body.author;
  if (text && author) {
    quotes.push({ text, author });
    res.status(200).json({ status: 'successful', data: { text, author } });
  } else {
    res.status(400).json({
      status: 'fail',
      message: 'Each quote must contain text and author',
    });
  }
};

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());

const router = express.Router();
app.use('/api/quotes/', router);

router.route('/').get(getAllQuotes).post(postQuote);
router.route('/random').get(getQuote);

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server listening port: ${PORT}`);
});
