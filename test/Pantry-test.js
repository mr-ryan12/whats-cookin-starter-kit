import { expect } from 'chai';
import Pantry from '../src/classes/Pantry';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';
import ingredientsData from '../src/data/ingredients-test-data';
import recipesData from '../src/data/recipe-test-data';
import userData from '../src/data/users-test-data';

describe('Pantry', () => {

  let user;
  let grilledCheese;
  let wings;
  let tobasco;
  let bread;

  beforeEach(() => {
    grilledCheese = new Recipe(
      recipesData[0].id,
      recipesData[0].image,
      recipesData[0].ingredients,
      recipesData[0].instructions,
      recipesData[0].name,
      recipesData[0].tags,
      ingredientsData)
    wings = new Recipe(
      recipesData[1].id,
      recipesData[1].image,
      recipesData[1].ingredients,
      recipesData[1].instructions,
      recipesData[1].name,
      recipesData[1].tags,
      ingredientsData);
    tobasco = new Ingredient(12345, {amount: 1, unit: 'btl'}, ingredientsData);
    bread = new Ingredient(18069, {amount: 2, unit: 'sl'}, ingredientsData);
    user = new User(userData[0], ingredientsData);
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
    expect(user.pantry).to.be.an.instanceof(Pantry);
  });

  it('should have a list of ingredients', () => {
    expect(user.pantry.ingredients).to.be.an('array');
    expect(user.pantry.ingredients.length).to.equal(5);
  });

  it('should be object instaces of the Ingredient class', () => {
    expect(user.pantry.ingredients[0]).to.be.an.instanceof(Ingredient);
  });

  it('should be able to determine whether the user has enough ingredients to cook a given meal', () => {
    expect(user.pantry.checkForIngredients(grilledCheese)).to.equal(false);
    expect(user.pantry.checkForIngredients(wings)).to.equal(true);
  });

  it('should be able to determine the amount of missing ingredients', () => {
    expect(user.pantry.determineMissingIngredients(grilledCheese)).to.be.an('array');
    expect(user.pantry.determineMissingIngredients(grilledCheese)[0].id).to.equal(18069);
    expect(user.pantry.determineMissingIngredients(grilledCheese)[0].quantity.amount).to.equal(1);
  });

  it('should be able to add ingredients', () => {
    user.pantry.addIngredient(tobasco);
    expect(user.pantry.ingredients.length).to.equal(6);
  });

  it('should not be able to add an ingredient that already exists', () => {
    user.pantry.addIngredient(bread);
    expect(user.pantry.ingredients.length).to.equal(5);
  })

  it('should be able to update quantities of the ingredients', () => {
    user.pantry.updateQuantity(bread, 10);
    expect(user.pantry.ingredients[user.pantry.ingredients.length - 1].quantity.amount).to.equal(11);
    user.pantry.updateQuantity(bread, -5);
    expect(user.pantry.ingredients[user.pantry.ingredients.length - 1].quantity.amount).to.equal(6);
  });
});