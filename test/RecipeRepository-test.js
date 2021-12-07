import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
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

  it('should ')
})