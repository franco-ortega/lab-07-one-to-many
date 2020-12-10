const pool = require('../utils/pool');

module.exports = class Bee {
    id;
    beeName;
    buzzStyle;
    fuzzyFactor;

    constructor(row) {
      this.id = row.id;
      this.beeName = row.bee_name;
      this.buzzStyle = row.buzz_style;
      this.fuzzyFactor = row.fuzzy_factor;
    }

    // Add CRUD
    // Create
    static async insert({ beeName, buzzStyle, fuzzyFactor }) {
      const { rows } = await pool .query(
        'INSERT INTO bees (bee_name, buzz_style, fuzzy_factor) VALUES ($1, $2, $3) RETURNING *',
        [beeName, buzzStyle, fuzzyFactor]
      );
      return new Bee(rows[0]);
    }
  


}