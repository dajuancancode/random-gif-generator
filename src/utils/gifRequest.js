require('dotenv').config();
const request = require('request');

const { GIPHY_API_KEY } = process.env;

const gifRequest = (query, callback) => {
  const encodedTag = encodeURIComponent(query);
  const url = `https://api.giphy.com/v1/gifs/search?q=${encodedTag}&limit=10`;

  const options = {
    url,
    json: true,
    headers: {
      'User-Agent': 'request',
      api_key: `${GIPHY_API_KEY}`,
    },
  };

  request(options, (err, { body } = {}) => {
    if (err) {
      callback('Unable to connect to giphy services', undefined);
    } else if (!body.data.length === 0) {
      callback(
        "We couldn't find a gif, so here's sad patrick instead",
        undefined
      );
    } else {
      let randomNumber = Math.floor(Math.random() * 10) + 1;
      if (randomNumber > body.data.length) {
        randomNumber = 0;
      }
      callback(undefined, body.data[randomNumber]);
    }
  });
};

module.exports = gifRequest;
