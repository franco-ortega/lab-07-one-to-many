const pool = require('../utils/pool');

module.exports = class Flower {
    id;
    color;
    fragrance;
    petals;

    constructor(row) {
      this.id = row.id;
      this.color = row.color;
      this.fragrance = row.fragrance;
      this.petals = row.petals;
    }

    // Add CRUD
    // Create
    static async insert({ color, fragrance, petals }) {
      const { rows } = await pool.query(
        'INSERT INTO flowers (color, fragrance, petals) VALUES ($1, $2, $3) RETURNING *',
        [color, fragrance, petals]
      );
      return new Flower(rows[0]);
    }

    // Read
    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM flowers');
        
      return rows.map(row => new Flower(row));
    }
};
