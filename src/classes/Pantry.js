import Ingredient from './Ingredient';

class Pantry {
  constructor(pantry, data) {
    this.ingredients = this.buildPantry(pantry, data);
    this.ingredientsData = data;
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
    const result = recipe.ingredients.reduce((acc, ingredient) => {
      const ing = this.ingredients.find(ing => ing.id === ingredient.id)
      !ing || ing.quantity.amount < ingredient.quantity.amount ?
        acc.push(new Ingredient(
          ing.id, 
          {
            amount: ingredient.quantity.amount - ing.quantity.amount, 
            unit: ingredient.quantity.unit
          },
          this.ingredientsData
          )) : null;
          return acc;
        }, [])

    return result;
  }

  addIngredient(ingredient) {
    const ids = this.ingredients.map(ingredient => ingredient.id)
    !ids.includes(ingredient.id) ? this.ingredients.push(ingredient) : null;
  }

  updateQuantity(ingredient, amount) {
    const thisIngredient = this.ingredients.find(ing => {
      return ing.id === ingredient.id
    });
    thisIngredient.quantity.amount += amount;
  }
}

export default Pantry;