const path = require('path');
const express = require('express');
const hbs = require('hbs');

const gifRequest = require('./utils/gifRequest');

// Setup paths for views
const viewPath = path.join(__dirname, '../templates/views');
const staticPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

app.get('', (req, res) => {
  res.render('index', { title: 'Random Gif Generator' });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help' });
});

app.get('/gif', (req, res) => {
  gifRequest(req.query.tag, (error, data) => {
    if (error) {
      return res.send({
        error,
        sadGif: 'https://giphy.com/embed/OPU6wzx8JrHna',
      });
    }
    res.send({ gifUrl: data });
  });
});

app.get('*', (req, res) => {
  res.render('404', { title: '404' });
});

app.listen(port, () => {
  console.log(`Server ready on port ${port}`);
});
