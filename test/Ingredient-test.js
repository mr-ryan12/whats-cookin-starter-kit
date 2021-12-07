import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';
import ingredientsData from '../src/data/ingredients-test-data.js';

describe('Ingredient', () => {

  let bread;
  let cheese;
  let butter;

  beforeEach(() => {
    bread = new Ingredient(ingredientsData[0].id);
    cheese = new Ingredient(ingredientsData[1].id);
    butter = new Ingredient(ingredientsData[2].id);
  });

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient', () => {
    expect(bread).to.be.an.instanceOf(Ingredient);
  });

  it('should have an id', () => {
    expect(butter.id).to.equal(3);
  });

  it('should have a name', () => {
    expect(cheese.name).to.equal('cheese');
  });

  it('should have an estimated cost in cents', () => {
    expect(bread.estimatedCostInCents).to.equal(10);
  });

  it('should be able to calculate total cost', () => {
    expect(bread.calculateCost(3)).to.equal(30);
  });
});