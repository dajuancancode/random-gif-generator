require('dotenv').config();
const request = require('request');

const { GIPHY_API_KEY } = process.env;

const gifRequest = (tagName, callback) => {
  const encodedTag = encodeURIComponent(tagName);
  const url = `https://api.giphy.com/v1/gifs/random?tag=${encodedTag}&rating=g`;

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
    } else {
      callback(undefined, body.data.embed_url);
    }
  });
};

module.exports = gifRequest;
