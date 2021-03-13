const { getRandomElement } = require('./utils');
const { quotes } = require('./data');

exports.getAllQuotes = (req, res) => {
  res.status(200).json({
    status: 'successfil',
    data: {
      quotes,
    },
  });
};

exports.getQuote = (req, res) => {
  const quote = getRandomElement(quotes);
  res.status(200).json({ status: 'successful', data: { quote } });
};

exports.postQuote = (req, res) => {
  const quote = req.query.quote;
  const person = req.query.person;
  if (quote && person) {
    quotes.push({ quote, person });
    res.status(200).json({ status: 'successful', data: { quote, person } });
  } else {
    res.status(400).json({
      status: 'fail',
      message: 'Each quote must contain text and author',
    });
  }
};
