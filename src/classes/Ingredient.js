class Ingredient {
  constructor(id, quantity, ingredientsData) {
    this.id = id || 0;
    this.name = this.findIngredientName(ingredientsData);
    this.estimatedCostInCents = this.findEstimatedCostInCents(ingredientsData);
    this.quantity = quantity;
  }

  calculateCost() {
    return this.quantity.amount * this.estimatedCostInCents;
  }

  findIngredientName(ingredientsData) {
    return ingredientsData ? ingredientsData.find(ingredient => {
      return this.id === ingredient.id
    }).name : '';
  }

  findEstimatedCostInCents(ingredientsData) {
    return ingredientsData ? ingredientsData.find(ingredient => {
      return this.id === ingredient.id
    }).estimatedCostInCents : 0;
  }
}

export default Ingredient;