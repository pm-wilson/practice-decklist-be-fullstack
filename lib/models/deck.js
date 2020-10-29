const pool = require('../utils/pool');

class Deck {
  id;
  deck;
  colors;
  format;

  constructor(row) {
    this.id = row.id;
    this.deck = row.deck;
    this.colors = row.colors;
    this.format = row.format;
  }

  static async insert(deck) {
    const { rows } = await pool.query(
      'INSERT INTO decks (deck, colors, format) VALUES ($1, $2, $3) RETURNING *',
      [deck.deck, deck.colors, deck.format]
    );

    return new Deck(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * from decks'
    );

    return rows.map(row => new Deck(row));
  }
}

module.exports = Deck;
