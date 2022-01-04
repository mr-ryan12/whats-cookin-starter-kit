import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Ingredient from '../src/classes/Ingredient';
import Recipe from '../src/classes/Recipe';
import recipeData from '../src/data/recipe-test-data.js';
import ingredientsData from '../src/data/ingredients-test-data';

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
        recipe.tags,
        ingredientsData
      ));
      return acc;
    }, []);

    recipeRepo = new RecipeRepository(recipeList, ingredientsData)
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should have a list of recipes', () => {
    expect(recipeRepo.recipes).to.be.an('array');
    expect(recipeRepo.recipes.length).to.equal(2);
  });

  it('should not have a list of recipes if none are passed in', () => {
    const recipeRepo1 = new RecipeRepository();
    expect(recipeRepo1.recipes).to.deep.equal([]);
  });
  
  it('should be class instances', () => {
    expect(recipeRepo.recipes[0]).to.be.an.instanceof(Recipe);
    expect(recipeRepo.recipes[1].ingredients[0]).to.be.an.instanceof(Ingredient);
  });

  it('should have a list of current recipes', () => {
    expect(recipeRepo.currentRecipes).to.be.an('array');
    expect(recipeRepo.currentRecipes.length).to.equal(2);
  });

  it('should not have a list of current recipes if none are given', () => {
    const recipeRepo1 = new RecipeRepository();
    expect(recipeRepo1.currentRecipes).to.deep.equal([]);
  });

  it('should be able to have a filter term', () => {
    expect(recipeRepo.filterTerm).to.be.a('string');
    expect(recipeRepo.filterTerm.length).to.equal(0);
  });

  it('should be able to change the filter term', () => {
    recipeRepo.addFilter('dinner');
    expect(recipeRepo.filterTerm).to.equal('dinner');
  });


  it('should be able to have a tag', () => {
    expect(recipeRepo.tag).to.be.a('string');
  });

  it('should be able to change the tag', () => {
    recipeRepo.addTag('snack');
    expect(recipeRepo.tag).to.equal('snack');
  })

  it('should be able to filter recipes by ingredient', () => {
    expect(recipeRepo.currentRecipes.length).to.equal(2);
    recipeRepo.addFilter('cheese');
    recipeRepo.filterRecipes();
    expect(recipeRepo.currentRecipes).to.be.an('array');
    expect(recipeRepo.currentRecipes[0].id).to.equal(10);
  });

  it('should be able to filter recipes by name', () => {
    expect(recipeRepo.currentRecipes.length).to.equal(2);
    recipeRepo.addFilter('Wing');
    recipeRepo.filterRecipes();
    expect(recipeRepo.currentRecipes).to.be.an('array');
    expect(recipeRepo.currentRecipes[0].id).to.equal(11);
  });

  it('should filter by name regardless of case', () => {
    recipeRepo.addFilter('wInG');
    recipeRepo.filterRecipes();
    expect(recipeRepo.currentRecipes[0].id).to.equal(11);
  });

  it('should be able to filter by tag', () => {
    recipeRepo.addTag('snack')
    recipeRepo.filterRecipes();
    expect(recipeRepo.currentRecipes.length).to.equal(2);
    recipeRepo.clearFilters();
    recipeRepo.addTag('dinner')
    recipeRepo.filterRecipes();
    expect(recipeRepo.currentRecipes.length).to.equal(1);
  });

  it('should be able to clear search terms', () => {
    recipeRepo.addFilter('Wing');
    recipeRepo.filterRecipes();
    expect(recipeRepo.filterTerm).to.equal('wing');
    recipeRepo.clearFilters();
    expect(recipeRepo.filterTerm).to.equal('');
  });

  it('should have a filter state', () => {
    expect(recipeRepo.filterState).to.be.a('string');
    expect(recipeRepo.filterState).to.equal('');
  });

  it('should be able to change the filter state', () => {
    expect(recipeRepo.filterState).to.equal('');
    recipeRepo.updateFilterState('favorites');
    expect(recipeRepo.filterState).to.equal('favorites');
  });
});