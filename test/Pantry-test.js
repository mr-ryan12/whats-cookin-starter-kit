import { expect } from 'chai';
import Pantry from './classes/Pantry';
import User from './classes/User';
import Recipe from './classes/Recipe';
import Ingredient from './classes/Ingredient';
import ingredientsData from '../src/data/ingredients-test-data';
import recipesData from '../src/data/recipe-test-data';
import userData from '../src/data/users-test-data';

decribe('Pantry', () => {

  let user;
  let pantry;
  let grilledCheese;
  let wings;
  let bread;

  beforeEach(() => {
    user = new User(userData[0]);
    pantry = new Pantry(user.pantry);
    grilledCheese = new Recipe(recipesData[0]);
    wings = new Recipe(recipesData[1]);
    bread = new Ingredient(18069, 2, ingredientsData);
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should have a list of ingredients', () => {
    expect(pantry.ingredients).to.be.an('array');
    expect(pantry.ingredients.length).to.equal(36);
  });

  it('should be object instaces of the Ingredient class', () => {
    expect(pantry.ingredients[0]).to.be.an.instanceof(Ingredient);
  });

  it('should be able to determine whether the user has enough ingredients to cook a given meal', () => {
    expect(pantry.checkForIngredients(grilledCheese)).to.equal(false);
    expect(pantry.checkForIngredients(wings)).to.equal(true);
  });

  it('should be able to determine the amount of missing ingredients', () => {
    expect(pantry.determineMissingIngredients(grilledCheese)).to.be.an('array');
    expect(pantry.determineMissingIngredients(grilledCheese)[0].id).to.equal(18069);
    expect(pantry.determineMissingIngredients(grilledCheese)[0].quantity.amount).to.equal(2);
  });

  it('should be able to view what is in the pantry', () => {
    expect(pantry.view()).to.be.an('array');
    expect(pantry.view().length).to.equal(36);
    expect(pantry.view()[0]).to.be.an.instanceof(Ingredient)
  });

  it('should be able to determine if there are enough ingredients to cook a meal in the cookbook', () => {
    user.addToCookbook(grilledCheese);
    user.addToCookbook(wings);

    expect(pantry.findReadyToCookMeals(user.cookbook)).to.be.an('array');
    expect(pantry.findReadyToCookMeals(user.cookbook).length).to.equal(1);
  });

  it('should be able to add ingredients', () => {
    pantry.addIngredient(bread);
    expect(pantry.ingredients.length).to.equal(37);
  });

  it('should be able to update quantities of the ingredients', () => {
    pantry.addIngredient(bread);
    pantry.updateQuantity(18069, 10);
    expect(pantry.ingredients[pantry.ingredients.length - 1].quantity).to.equal(12);
    pantry.updateQuantity(18069, -5);
    expect(pantry.ingredients[pantry.ingredients.length - 1].quantity).to.equal(7);
  });
});