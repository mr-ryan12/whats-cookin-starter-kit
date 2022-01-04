import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';
import ingredientsData from '../src/data/ingredients-test-data.js';

describe('Ingredient', () => {

  let bread;
  let cheese;
  let butter;

  beforeEach(() => {
    bread = new Ingredient(ingredientsData[0].id, {amount: 2, unit: 'sl'}, ingredientsData);
    cheese = new Ingredient(ingredientsData[1].id, {amount: 2, unit: 'sl'}, ingredientsData);
    butter = new Ingredient(ingredientsData[2].id, {amount: 1, unit: 'tsp'}, ingredientsData);
  });

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient', () => {
    expect(bread).to.be.an.instanceOf(Ingredient);
  });

  it('should have an id', () => {
    expect(butter.id).to.equal(1145);
  });

  it('should have a default id of 0 if none is passed in', () => {
    const ingredient1 = new Ingredient();
    expect(ingredient1.id).to.equal(0);
  });

  it('should have a name', () => {
    expect(cheese.name).to.equal('cheese');
  });

  it('should not have a name if none is provided', () => {
    const ingredient1 = new Ingredient();
    expect(ingredient1.name).to.equal('');
  });

  it('should have an estimated cost in cents', () => {
    expect(bread.estimatedCostInCents).to.equal(863);
  });

  it('should be able to calculate total cost', () => {
    expect(bread.calculateCost()).to.equal(1726);
  });

  it('should not have an estimated cost if none is provided', () => {
    const ingredient1 = new Ingredient();
    expect(ingredient1.estimatedCostInCents).to.equal(0);
  });
});