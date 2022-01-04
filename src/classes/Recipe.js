import Ingredient from "./Ingredient";

class Recipe {
  constructor(id, image, ingredients = [], instructions = [], name, tags = [], ingredientsData) {
    this.id = id;
    this.image = image;
    this.ingredients = this.createIngredients(ingredients, ingredientsData);
    this.instructions = instructions;
    this.name = name;
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