class Ingredient {
  constructor(id, quantity, ingredientsData) {
    this.id = id;
    this.name = this.findIngredientName(ingredientsData);
    this.estimatedCostInCents = this.findEstimatedCostInCents(ingredientsData);
    this.quantity = quantity;
  }

  calculateCost() {
    return this.quantity.amount * this.estimatedCostInCents;
  }

  findIngredientName(ingredientsData) {
    return ingredientsData.find(ingredient => this.id === ingredient.id).name;
  }

  findEstimatedCostInCents(ingredientsData) {
    return ingredientsData.find(ingredient => this.id === ingredient.id).estimatedCostInCents;
  }
}

export default Ingredient;