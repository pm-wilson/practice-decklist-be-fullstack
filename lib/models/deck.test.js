const fs = require('fs');
const pool = require('../utils/pool');
const Deck = require('./deck');

describe('Deck model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new deck and adds to the database', async() => {
    const createdDeck = await Deck.insert({
      deck: 'Balthazar',
      colors: 'WUBRG',
      format: 'Commander',
    });

    const { rows } = await pool.query(
      'SELECT * from decks WHERE id = $1',
      [createdDeck.id]
    );

    expect(rows[0]).toEqual(createdDeck);
  });
});
