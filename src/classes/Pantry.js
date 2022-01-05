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

  determineMissingIngredients(recipe) {
    // Iterate through the recipe ingredients
    // If the amount in the recipeINgredientAmout is greater than the pantryIngredientAmount, return the recipeIngredient, else do nothing.
    // Then iterate over the array of ingredients needed and subtract the amount in the pantry
    // return the array
    const ids = this.ingredients.map(ingredient => {
      return ingredient.id
    })

    const ingredientsNeeded = recipe.ingredients.reduce((acc, ingredient) => {
      const thisIngredient = this.ingredients.find(ing => {
        return ing.id === ingredient.id
      })

      thisIngredient.quantity.amount < ingredient.quantity.amount ||
      !ids.includes(ingredient.id) ?
        acc.push(ingredient) : null;

      return acc;
    }, [])

    ingredientsNeeded.forEach(ingredient => {
      const thisIngredient = this.ingredients.find(ing => {
        return ing.id === ingredient.id
      })
      ingredient.quantity.amount -= thisIngredient.quantity.amount
    })
    
    console.log('FROM THE CLASS FILE>>>>>>>', ingredientsNeeded)
    return ingredientsNeeded;
  }
}

export default Pantry;