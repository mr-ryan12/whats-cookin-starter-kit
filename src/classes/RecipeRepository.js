class RecipeRepository {
  constructor(recipes = []) {
    this.recipes = recipes;
    this.cookbookRecipes = [];
    this.filterTerm = '';
    this.currentRecipes = this.recipes;
  }

  addToCookbook(recipe) {
    this.cookbookRecipes.push(recipe);
  }

  addFilter(term) {
    this.filterTerm = term;
  }

  filterRecipesByTag(tag) {
    this.currentRecipes = this.currentRecipes.filter(recipe => recipe.tags.includes(tag));
  }

  filterRecipesByName() {
    this.currentRecipes = this.currentRecipes.filter(recipe => {
      return recipe.name.includes(this.filterTerm);
    })
  }

  filterRecipesByIngredient() {
    this.currentRecipes = this.currentRecipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => ingredient.name === this.filterTerm);
    })
  }

  clearFilters() {
    this.filterTerms = [];
    this.currentRecipes = this.recipes;
  }
}

export default RecipeRepository;
