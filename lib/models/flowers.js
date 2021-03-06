const pool = require('../utils/pool');
const Bee = require('./bees');

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

    static async findById(id) {
      const { rows } = await pool.query(
        `
          SELECT
            flowers.*,
            array_to_json(array_agg(bees.*)) AS bees
          FROM
            flowers
          JOIN bees
          ON flowers.id = bees.flower_id
          WHERE flowers.id=$1
          GROUP BY flowers.id
          `,
        [id]
      );

      if(!rows[0]) throw Error(`No flower with id ${id} exists.`);
      return {
        ...new Flower(rows[0]),
        bees: rows[0].bees.map(bee => new Bee(bee))
      };
    }

    // Update
    static async update(id, { color, fragrance, petals }) {
      const { rows } = await pool.query(
        `UPDATE flowers
            SET
                color=$1,
                fragrance=$2,
                petals=$3
            WHERE id=$4
            RETURNING *`,
        [color, fragrance, petals, id]
      );

      if(!rows[0]) throw Error(`No flower with id ${id} exists.`);
      return new Flower(rows[0]);
    }

    // Delete
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM flowers WHERE id=$1 RETURNING *',
        [id]);
  
      return new Flower(rows[0]);
    }
};
