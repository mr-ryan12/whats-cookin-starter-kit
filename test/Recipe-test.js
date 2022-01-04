import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import recipesData from '../src/data/recipe-test-data';
import ingredientsData from '../src/data/ingredients-test-data';

describe('Recipe', () => {

  let recipe;
  beforeEach(() => {
    recipe = new Recipe(
      recipesData[0].id,
      recipesData[0].image,
      recipesData[0].ingredients,
      recipesData[0].instructions,
      recipesData[0].name,
      recipesData[0].tags,
      ingredientsData
    );
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be a instance of Recipe', () => {
    expect(recipe).to.be.an.instanceOf(Recipe);
  });

  it('should have an id', () => {
    expect(recipe.id).to.equal(10);
  });

  it('should default to 0 if no id is passed in', () => {
    const recipe1 = new Recipe();
    expect(recipe1.id).to.equal(0);
  });

  it('should have an image', () => {
    expect(recipe.image).to.equal("https://grillcheese.jpg");
  });

  it('should have a default image if none is passed in', () => {
    const recipe1 = new Recipe();
    expect(recipe1.image).to.equal('https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101027/112815900-no-image-available-icon-flat-vector.jpg');
  });

  it('should have ingredients', () => {
    expect(recipe.ingredients).to.be.an('array');
    expect(recipe.ingredients.length).to.equal(3);
  });

  it('should default to an empty array if no ingredients are passed in', () => {
    const recipe1 = new Recipe();
    expect(recipe1.ingredients).to.deep.equal([]);
  });

  it('should have a quantity for each ingredient', () => {
    expect(recipe.ingredients[0].quantity.amount).to.equal(2);
  });

  it('should have a list of instructions', () => {
    expect(recipe.instructions).to.be.an('array');
    expect(recipe.instructions.length).to.equal(2);
    expect(recipe.instructions[0].instruction).to.equal("Butter two pieces of bread.");
  });

  it('should default to an empty array if no instructions are passed in', () => {
    const recipe1 = new Recipe();
    expect(recipe1.instructions).to.deep.equal([]);
  });

  it('should have a name', () => {
    expect(recipe.name).to.equal("Grill Cheese");
  });

  it('should be able to not have a name', () => {
    const recipe1 = new Recipe();
    expect(recipe1.name).to.equal('');
  });

  it('should have a list of tags', () => {
    expect(recipe.tags).to.be.an('array');
    expect(recipe.tags.length).to.equal(3);
    expect(recipe.tags[0]).to.equal("snack");
  });

  it('should not have a list of tags if none are passed in', () => {
    const recipe1 = new Recipe;
    expect(recipe1.tags).to.deep.equal([]);
  });

  it('should be able to calculate total cost', () => {
    expect(recipe.calculateRecipeCost()).to.equal(4043);
  });

  it('should not have a cost if no cost is provided', () => {
    const recipe1 = new Recipe();
    expect(recipe1.calculateRecipeCost()).to.equal(0);
  });

  it('should be able to list ingredient names', () => {
    expect(recipe.listIngredients()).to.deep.equal([
      'gluten-free white sandwich bread',
      'cheese',
      'unsalted butter'
    ]);
  });

  it('should not have a list of ingredients if none are provided', () => {
    const recipe1 = new Recipe();
    expect(recipe1.listIngredients()).to.deep.equal([]);
  });

  it('should not have a list of instructions if none are provided', () => {
    const recipe1 = new Recipe();
    expect(recipe1.listInstructions()).to.deep.equal([]);
  });

  it('should be able to return the directions', () => {
    expect(recipe.listInstructions()).to.deep.equal([
      "Butter two pieces of bread.", 
      "Grill our bread with cheese in between."
    ])
  })
});