import ingredientsData from '../data/ingredients-test-data.js';

class Ingredient {
  constructor(id, quantity) {
    this.id = id;
    this.name = ingredientsData.find(ingredient => this.id === ingredient.id).name;
    this.estimatedCostInCents = ingredientsData.find(ingredient => this.id === ingredient.id).estimatedCostInCents;
    this.quantity = quantity;
  }

  calculateCost(quantity) {
    return quantity * this.estimatedCostInCents;
  }
}

export default Ingredient;