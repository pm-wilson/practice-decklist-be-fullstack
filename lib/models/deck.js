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
    const formattedRows = rows.map(row => new Deck(row));
    
    return formattedRows;
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM decks WHERE id=$1',
      [id]
    );

    if(!rows[0]) return null;
    return new Deck(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM decks WHERE id = $1 RETURNING *',
      [id]
    );

    return new Deck(rows[0]);
  }

  static async update(id, deck) {
    const { rows } = await pool.query(
      `UPDATE decks
      SET deck=$1,
          colors=$2,
          format=$3
      WHERE id=$4
      RETURNING *`,
      [deck.deck, deck.colors, deck.format, id]
    );

    return new Deck(rows[0]);
  }
}

module.exports = Deck;
