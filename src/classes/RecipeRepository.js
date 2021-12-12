import Recipe from './Recipe';

class RecipeRepository {
  constructor(recipes, ingredientsData) {
    this.recipes = recipes.reduce((acc, recipe) => {
      acc.push(new Recipe(
        recipe.id,
        recipe.image,
        recipe.ingredients,
        recipe.instructions,
        recipe.name,
        recipe.tags,
        ingredientsData
      ));
      return acc;
    }, []);
    this.cookbookRecipes = [];
    this.filterTerm = '';
    this.tag = '';
    this.currentRecipes = this.recipes;
    this.filterState = '';
  }

  addToCookbook(recipe) {
    this.cookbookRecipes.push(recipe);
  }

  addFilter(term) {
    this.filterTerm = term.toLowerCase();
  }

  addTag(tag) {
    this.tag = tag;
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
}

export default RecipeRepository;
