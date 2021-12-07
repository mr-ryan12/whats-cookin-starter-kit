class Ingredient {
  constructor(id, name, cost) {
    this.id = id;
    this.name = name;
    this.estimatedCost = cost;
  }

  calculateCost(quantity) {
    return quantity * this.estimatedCost;
  }
}

export default Ingredient;