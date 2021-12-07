import Ingredient from "./Ingredient";

class Recipe {
  constructor(id, image, ingredients = [], instructions = [], name, tags = []) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients.map(ingredient => {
      return new Ingredient(ingredient.id, ingredient.quantity.amount)
    });
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }

  calculateCost() {
    return this.ingredients.reduce((total, ingredient) => {
      total += ingredient.quantity * ingredient.estimatedCostInCents
      return total;
    }, 0);
  }
}

export default Recipe;