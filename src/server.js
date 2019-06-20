const path = require('path');
const express = require('express');

const gifRequest = require('./utils/gifRequest');

// Setup paths for views
const viewPath = path.join(__dirname, '../templates/views');
const staticPath = path.join(__dirname, '../public');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewPath);

app.use(express.static(staticPath));

app.get('', (req, res) => {
  res.render('index');
});

app.get('/gif', (req, res) => {
  gifRequest('Gaming', (error, data) => {
    if (error) {
      return res.send({
        error,
        sadGif: 'https://giphy.com/gifs/OPU6wzx8JrHna/html5',
      });
    }
    res.send({ gifUrl: data });
  });
});

app.listen(port, () => {
  console.log(`Server ready on port ${port}`);
});
