const { Router } = require('express');
const Deck = require('../models/deck');

module.exports = Router()
  .post('/', (req, res, next) => {
    Deck
      .insert(req.body)
      .then(deck => res.send(deck))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Deck
      .update(req.params.id, req.body)
      .then(deck => res.send(deck))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Deck
      .find()
      .then(decks => res.send(decks))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Deck
      .findById(req.params.id)
      .then(deck => res.send(deck))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Deck
      .deleteById(req.params.id)
      .then(deck => res.send(deck))
      .catch(next);
  });
