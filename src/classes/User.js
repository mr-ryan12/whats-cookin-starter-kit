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
    const index = this.favorites.indexOf(recipeToRemove);
    this.favorites.splice(index, 1);
  }

  addToCookbook(recipe) {
    this.cookbook.push(recipe);
  }

  removeFromCookbook(recipe) {
    const index = this.cookbook.indexOf(recipe);
    // console.log(index)
    this.cookbook.splice(index, 1);
  }
}

export default User;