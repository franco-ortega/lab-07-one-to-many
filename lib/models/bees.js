module.exports = class Bee {
    id;
    beeName;
    buzzStyle;
    fuzzyFactor;

    constructor(row) {
      this.id = row.id;
      this.beeName = row.bee_name;
      this.buzzStyle = row.buzz_style;
      this.fuzzy = row.fuzzy_factor;
    }


}