const { getRandomElement } = require('./utils');
const superagent = require('superagent');

let quotes;
//Populate quotes from a public API
(async () => {
  const data = await superagent.get('https://type.fit/api/quotes');
  quotes = Array.from(JSON.parse(data.text));
})();

exports.getAllQuotes = (req, res) => {
  console.log(Array.isArray(quotes));
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
  const text = req.query.quote;
  const author = req.query.person;
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
