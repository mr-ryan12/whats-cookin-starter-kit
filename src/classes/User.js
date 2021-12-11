class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favorites = [];
    this.cookbook = [];
  }

  addToFavorites(recipe) {
    this.favorites.push(recipe);
  }

  removeFromFavorites(recipeToRemove) {
    const index = this.favorites.find((recipe, index) => {
      recipe.id === recipeToRemove.id;
      return index;
    });
    this.favorites.splice(index, 1);
  }

  addToCookbook(recipe) {
    this.cookbook.push(recipe);
  }

  removeFromCookbook(recipeToRemove) {
    const index = this.cookbook.find((recipe, index) => {
      recipe.id === recipeToRemove.id;
      return index;
    });
    this.cookbook.splice(index, 1);
  }
}

export default User;