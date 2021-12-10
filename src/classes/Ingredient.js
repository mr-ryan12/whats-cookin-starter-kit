class Ingredient {
  constructor(id, quantity, ingredientsData) {
    this.id = id;
    this.name = ingredientsData.find(ingredient => this.id === ingredient.id).name;
    this.estimatedCostInCents = ingredientsData.find(ingredient => this.id === ingredient.id).estimatedCostInCents;
    this.quantity = quantity;
  }

  calculateCost() {
    return this.quantity.amount * this.estimatedCostInCents;
  }
}

export default Ingredient;