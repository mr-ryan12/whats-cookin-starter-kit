import Pantry from './Pantry';

class User {
  constructor(user, data) {
    this.name = user.name || 'Guest User';
    this.id = user.id || 0;
    this.pantry = this.createPantry(user.pantry, data)
    this.favorites = [];
    this.cookbook = [];
  }

  addToFavorites(recipe) {
    this.favorites.push(recipe);
  }

  removeFromFavorites(recipeToRemove) {
    const index = this.favorites.indexOf(recipeToRemove);
    this.favorites.splice(index, 1);
  }

  addToCookbook(recipe) {
    this.cookbook.push(recipe);
  }

  removeFromCookbook(recipe) {
    const index = this.cookbook.indexOf(recipe);
    this.cookbook.splice(index, 1);
  }

  createPantry(pantry, data) {
    return new Pantry(pantry, data)
  }
}

export default User;