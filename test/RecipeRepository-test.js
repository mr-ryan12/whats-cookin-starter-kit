import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Ingredient from '../src/classes/Ingredient';
import Recipe from '../src/classes/Recipe';
import recipeData from '../src/data/recipe-test-data.js';

describe('RecipeRepo', () => {

  let recipeList;
  let recipeRepo;

  beforeEach(() => {
    recipeList = recipeData.reduce((acc, recipe) => {
      acc.push(new Recipe(
        recipe.id,
        recipe.image,
        recipe.ingredients,
        recipe.instructions,
        recipe.name,
        recipe.tags
      ));
      return acc;
    }, []);

    recipeRepo = new RecipeRepository(recipeList)
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should have a list of recipes', () => {
    expect(recipeRepo.recipes).to.be.an('array');
    expect(recipeRepo.recipes.length).to.equal(2);
  });
  
  it('should be class instances', () => {
    expect(recipeRepo.recipes[0]).to.be.an.instanceof(Recipe);
    expect(recipeRepo.recipes[1].ingredients[0]).to.be.an.instanceof(Ingredient);
  })

  it('should have a list of current recipes', () => {
    expect(recipeRepo.cookbookRecipes).to.be.an('array');
    expect(recipeRepo.cookbookRecipes.length).to.equal(0);
  });

  it('should be able to add recipes to the cookbook', () => {
    let grilledCheese = recipeRepo.recipes[0];
    recipeRepo.addToCookbook(grilledCheese)

    expect(recipeRepo.cookbookRecipes.length).to.equal(1);
    expect(recipeRepo.cookbookRecipes[0].id).to.equal(10);
  });

  it('should be able to have a filter term', () => {
    expect(recipeRepo.filterTerm).to.be.a('string');
    expect(recipeRepo.filterTerm.length).to.equal(0);
  });

  it('should be able to change the filter term', () => {
    recipeRepo.addFilter('dinner');
    expect(recipeRepo.filterTerm).to.equal('dinner');
  });

  it('should be able to filter recipes by ingredient', () => {
    expect(recipeRepo.currentRecipes.length).to.equal(2);
    recipeRepo.addFilter('cheese');
    recipeRepo.filterRecipesByIngredient();
    expect(recipeRepo.currentRecipes).to.be.an('array');
    expect(recipeRepo.currentRecipes[0].id).to.equal(10);
  });

  it('should be able to filter recipes by name', () => {
    expect(recipeRepo.currentRecipes.length).to.equal(2);
    recipeRepo.addFilter('Burger');
    recipeRepo.filterRecipesByName();
    expect(recipeRepo.currentRecipes).to.be.an('array');
    expect(recipeRepo.currentRecipes[0].id).to.equal(11);
  });

  it('should be able to filter by tag', () => {
    recipeRepo.filterRecipesByTag('sandwich');
    expect(recipeRepo.currentRecipes.length).to.equal(2);
    recipeRepo.clearFilters();
    recipeRepo.filterRecipesByTag('dinner');
    expect(recipeRepo.currentRecipes.length).to.equal(1);
  });

  it('should be able to clear search terms', () => {
    recipeRepo.addFilter('Burger');
    recipeRepo.filterRecipesByName();
    expect(recipeRepo.currentRecipes.length).to.equal(1);
    recipeRepo.clearFilters();
    expect(recipeRepo.currentRecipes.length).to.equal(2);
  });
  //clearFilters method will do 2 things: 
  // 1. clear all the search terms from the array and return an empty array
  // 2. iterate through all recipes and add all ids to the currentRecipes array
  
  // filterRecipes method will return all recipes that contain the filterTerms (ingredient names, recipe names, recipe tags)
})