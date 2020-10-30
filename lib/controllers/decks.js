const { Router } = require('express');
const Deck = require('../models/deck');

module.exports = Router()
  .post('/', (req, res, next) => {
    Deck
      .insert(req.body)
      .then(deck => res.send(deck))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Deck
      .find()
      .then(decks => res.send(decks))
      .catch(next);
  });
