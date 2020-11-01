const fs = require('fs');
const pool = require('../utils/pool');
const Deck = require('./deck');

describe('Deck model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new deck and adds to the database and finds it by id', async() => {
    const createdDeck = await Deck.insert({
      deck: 'New Deck',
      colors: 'WUBRG',
      format: 'Commander',
    });

    const foundDeck = await Deck.findById(createdDeck.id);

    expect(foundDeck).toEqual(createdDeck);
  });

  it('creates a deck, updates it, and finds the new deck', async() => {
    const createdDeck = await Deck.insert({
      deck: 'New Deck',
      colors: 'WUBRG',
      format: 'Commander',
    });

    const updatedDeck = await Deck.update(createdDeck.id, {
      deck: 'New Deck',
      colors: 'W',
      format: 'Casual',
    });

    const foundDecks = await Deck.find();

    expect(foundDecks[0]).toEqual(updatedDeck);
  });

  it('creates two decks and finds the remaining deck', async() => {
    const createdDeck = await Deck.insert({
      deck: 'Created Deck 1',
      colors: 'WUBRG',
      format: 'Commander',
    });

    const createdDeck2 = await Deck.insert({
      deck: 'Created Deck 2',
      colors: 'G',
      format: 'Casual',
    });

    Deck.deleteById(createdDeck.id);

    const foundDecks = await Deck.find();

    expect(foundDecks[0]).toEqual(createdDeck2);
  });
});
