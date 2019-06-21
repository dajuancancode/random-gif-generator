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
    } else {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      callback(undefined, body.data[randomNumber]);
    }
  });
};

module.exports = gifRequest;

// else if (!body.data.embed_url) {
//   callback(
//     "We couldn't find a gif, so here's sad patrick instead",
//     undefined
//   );
// }
