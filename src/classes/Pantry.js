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
}

export default Pantry;