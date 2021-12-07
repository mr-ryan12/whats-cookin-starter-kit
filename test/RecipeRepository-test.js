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
    expect(recipeRepo.recipes[0]).to.be.an.instanceof(Recipe);
  });

  it('should have a list of current recipes', () => {
    expect(recipeRepo.cookbookRecipes).to.be.an('array');
    expect(recipeRepo.cookBookRecipes.length).to.be(0);
  });

  it('should be able to add recipes to the cookbook', () => {
    let grilledCheese = recipeRepo[0];
    recipeRepo.addToCookbook(grilledCheese)

    expect(recipeRepo.cookbook.length).to.equal(1);
    expect()
  })
})