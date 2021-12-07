import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Ingredient from '../src/classes/Ingredient';
import Recipe from '../src/classes/Recipe';
import recipeData from '../src/data/recipe-test-data.js';

describe('Recipe', () => {

  let recipeRepo;

  beforeEach(() => {
    recipeRepo = recipeData.reduce((acc, recipe) => {
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
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should have a list of recipes', () => {
    expect(recipeRepo.recipes).to.be.an('array');
    expect(recipeRepo.recipes.length).to.be(2);
  });
  
  it('should be class instances', () => {
    expect(recipeRepo.recipes[0]).to.be.an.instanceof(Recipe);
    expect(recipeRepo.recipes[1].ingredients).to.be.an.instanceof(Ingredient);
  })

  it('should have a list of current recipes', () => {
    expect(recipeRepo.cookbookRecipes).to.be.an('array');
    expect(recipeRepo.cookbookRecipes.length).to.be(0);
  });

  it('should be able to add recipes to the cookbook', () => {
    let grilledCheese = recipeRepo[0];
    recipeRepo.addToCookbook(grilledCheese)

    expect(recipeRepo.cookbookRecipes.length).to.equal(1);
    expect(recipeRepo.cookbookRecipes[0]).to.equal(10);
  });

  it('should have a list of filter terms', () => {
    expect(recipeRepo.filterTerms).to.be.an('array');
    expect(recipeRepo.filterTerms.length).to.be(0);
  });

  it('should be able to add terms to the list of filter terms', () => {
    recipeRepo.addFilter('dinner');
    expect(recipeRepo.filterTerms[0]).to.equal('dinner');
  });

  it('should be able to return a filtered list of recipe ids', () => {
    expect(recipeRepo.filteredRecipeIds.length).to.be(2);
    recipeRepo.addFilter('snack');
    recipeRepo.filterRecipes();
    expect(recipeRepo.filteredRecipeIds).to.be.an('array');
    expect(recipeRepo.filteredRecipeIds[0]).to.equal(10);
  });

  it('should be able to filter by multiple search terms', () => {
    recipeRepo.addFilter('sandwich');
    expect(recipeRepo.filteredRecipeIds.length).to.equal(2);
    recipeRepo.addFilter('dinner');
    expect(recipeRepo.filteredRecipeIds.length).to.equal(1);
  });


  // filterRecipes method will return all recipes that contain the filterTerms (ingredient names, recipe names, recipe tags)
})