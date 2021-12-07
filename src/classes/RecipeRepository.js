class RecipeRepository {
  constructor(recipes = []) {
    this.recipes = recipes;
    this.cookbookRecipes = [];
    this.filterTerms = [];
    this.currentRecipeIds = this.recipes.map(recipe => recipe.id);
  }

  addToCookbook(recipe) {
    this.cookbookRecipes.push(recipe.id);
  }

  addFilter(term) {
    this.filterTerms.push(term);
  }

  filterRecipes() {
    this.recipes.reduce((acc, recipe) => {
      // Filter all recipes where the name contains ANY of the search term

      // Filter all recipes that include the specified tags

      // Filter all recipes where the ingredient names contain ANY of the terms
      return acc;
    }, []);
  }

  clearFilters() {
    this.filterTerms = [];
    this.currentRecipeIds = [];
    this.recipes.forEach(recipe => this.currentRecipeIds.push(recipe.id));
  }
}

export default RecipeRepository;
