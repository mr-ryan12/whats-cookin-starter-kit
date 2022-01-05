import Ingredient from './Ingredient';

class Pantry {
  constructor(pantry, data) {
    this.ingredients = this.buildPantry(pantry, data);
  }

  buildPantry (pantry, data) {
    return pantry.map(item => {
      return new Ingredient(item.ingredient, {amount: item.amount, unit: ''}, data)
    })
  }

  checkForIngredients(recipe) {
    let canMake = true;

    const ids = this.ingredients.map(ingredient => {
      return ingredient.id
    })

    recipe.ingredients.forEach(ingredient => {
      const thisIngredient = this.ingredients.find(ing => {
        return ing.id === ingredient.id
      })
      !ids.includes(ingredient.id) || thisIngredient.quantity.amount < ingredient.quantity.amount ? canMake = false : null;
    })

    return canMake;
  }

  
}

export default Pantry;