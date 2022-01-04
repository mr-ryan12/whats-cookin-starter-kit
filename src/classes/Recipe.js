import Ingredient from "./Ingredient";

class Recipe {
  constructor(id, image, ingredients = [], instructions = [], name, tags = [], ingredientsData) {
    this.id = id || 0;
    this.image = image || 'https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101027/112815900-no-image-available-icon-flat-vector.jpg';
    this.ingredients = this.createIngredients(ingredients, ingredientsData);
    this.instructions = instructions;
    this.name = name || '';
    this.tags = tags;
  }

  calculateRecipeCost() {
    return this.ingredients.reduce((total, ingredient) => {
      total += ingredient.calculateCost();
      return total;
    }, 0);
  }

  listIngredients() {
    return this.ingredients.map(ingredient => ingredient.name);
  }

  listInstructions() {
    return this.instructions.map(instruction => instruction.instruction);
  }

  createIngredients(ingredients, ingredientsData) {
    return ingredients.map(ingredient => {
      return new Ingredient(ingredient.id, ingredient.quantity, ingredientsData)
    });
  }
}

export default Recipe;