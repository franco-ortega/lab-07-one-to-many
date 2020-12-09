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
};
