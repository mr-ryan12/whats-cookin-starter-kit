import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';
import ingredientsData from '../src/data/ingredients-test-data.js';

describe('Recipe', () => {

  let bread;
  let cheese;
  let butter;

  beforeEach(() => {
    bread = new Ingredient(ingredientsData[0].id, ingredientsData[0].name, ingredientsData[0].estimatedCostInCents);
    cheese = new Ingredient(ingredientsData[1].id, ingredientsData[1].name, ingredientsData[1].estimatedCostInCents);
    butter = new Ingredient(ingredientsData[2].id, ingredientsData[2].name, ingredientsData[2].estimatedCostInCents);
  });
});