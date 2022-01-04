import { expect } from 'chai';
import Pantry from './classes/Pantry';
import User from './classes/User'
import ingredientsData from '../src/data/ingredients-test-data';
import userData from '../src/data/users-test-data';

decribe('Pantry', () => {

  let user;
  let pantry;

  beforeEach(() => {
    user = new User(userData[0]);
    pantry = new Pantry(user.pantry)
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should have a list of ingredients', () => {
    expect(pantry.ingredients).to.be.an('array');
    expect(pantry.ingredients.length).to.equal(35);
  });
});