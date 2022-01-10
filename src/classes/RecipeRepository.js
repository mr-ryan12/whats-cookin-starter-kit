import Recipe from './Recipe';

class RecipeRepository {
  constructor(recipes, ingredientsData) {
    this.recipes = this.makeRecipes(recipes, ingredientsData);
    this.filterTerm = '';
    this.tag = '';
    this.currentRecipes = this.recipes;
    this.filterState = '';
    this.currentRecipe = {};
  }

  addFilter(term) {
    this.filterTerm = term.toLowerCase();
  }

  addTag(tag) {
    this.tag = tag;
  }

  updateFilterState(state) {
    this.filterState = state;
  }

  filterRecipes() {
    this.tag !== '' && this.filterTerm === '' ?
    this.currentRecipes = this.currentRecipes.filter(recipe => recipe.tags.includes(this.tag)) :
    this.tag === '' && this.filterTerm !== '' ?
    this.currentRecipes = this.currentRecipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(this.filterTerm) ||
      recipe.ingredients.find(ingredient => ingredient.name === this.filterTerm);
    }) : this.tag !== '' && this.filterTerm !== '' ?
    this.currentRecipes = this.currentRecipes.filter(recipe => {
      return recipe.tags.includes(this.tag) &&
      (recipe.name.toLowerCase().includes(this.filterTerm) ||
      recipe.ingredients.find(ingredient => ingredient.name === this.filterTerm))
    }) : null;
  }

  clearFilters() {
    this.filterTerm = '';
    this.tag = '';
  }

  makeRecipes(recipes, ingredientsData) {
    return recipes ? recipes.map(recipe => {
      return new Recipe(
        recipe.id,
        recipe.image,
        recipe.ingredients,
        recipe.instructions,
        recipe.name,
        recipe.tags,
        ingredientsData
      )
    }) : [];
  }

  assignCurrentRecipe(recipe) {
    this.currentRecipe = recipe;
  }
}

export default RecipeRepository;
