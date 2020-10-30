const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/decks', require('./controllers/decks'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
