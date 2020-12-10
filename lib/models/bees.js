const pool = require('../utils/pool');

module.exports = class Bee {
    id;
    beeName;
    buzzStyle;
    fuzzyFactor;
    flowerId;

    constructor(row) {
      this.id = String(row.id);
      this.beeName = row.bee_name;
      this.buzzStyle = row.buzz_style;
      this.fuzzyFactor = row.fuzzy_factor;
      this.flowerId = String(row.flower_id);
    }

    // Add CRUD
    // Create
    static async insert({ beeName, buzzStyle, fuzzyFactor, flowerId }) {
      const { rows } = await pool .query(
        'INSERT INTO bees (bee_name, buzz_style, fuzzy_factor, flower_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [beeName, buzzStyle, fuzzyFactor, flowerId]
      );
      return new Bee(rows[0]);
    }

    // Read
    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM bees');
      
      return rows.map(row => new Bee(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM bees WHERE id=$1',
        [id]);

      if(!rows[0]) throw Error(`No bee with id ${id} exists.`);
      return new Bee(rows[0]);
    }

    // Update
    static async update(id, { beeName, buzzStyle, fuzzyFactor, flowerId }) {
      const { rows } = await pool.query(
        `UPDATE bees
              SET
                bee_name=$1,
                buzz_style=$2,
                fuzzy_factor=$3,
                flower_id=$4
              WHERE id=$5
              RETURNING *`,
        [beeName, buzzStyle, fuzzyFactor, flowerId, id]
      );
  
      if(!rows[0]) throw Error(`No bee with id ${id} exists.`);
      return new Bee(rows[0]);
    }

    // Delete
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM bees WHERE id=$1 RETURNING *',
        [id]);
        
      return new Bee(rows[0]);
    }
  

};
