const request = require('request');

const gifRequest = (tagName, callback) => {
  const encodedTag = encodeURIComponent(tagName);
  const url = `https://api.giphy.com/v1/gifs/random?tag=${encodedTag}&rating=g`;

  const options = {
    url,
    json: true,
    headers: {
      'User-Agent': 'request',
      api_key: 'xKZGxgGWdQ3Wfszbe2crspBQz5zRvS08',
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
