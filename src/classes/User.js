class User {
  constructor(user) {
    this.name = user.name || 'Guest User';
    this.id = user.id || 0;
    this.pantry = user.pantry || [];
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
}

export default User;