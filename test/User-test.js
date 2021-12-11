import { expect } from 'chai';
import User from '../src/classes/User';
import userData from '../data/user';
import recipesData from '../data/recipe-test-data';
import ingredientsData from '../data/ingredients-test-data';

describe('User', () => {

  let user;
  let grilledCheese;
  let wings;

  beforeEach(() => {
    user = new User(userData[0]);
    grilledCheese = new Recipe(recipesData[0], ingredientsData)
    wings = new Recipe(recipesData[1], ingredientsData)
  })

  it('should be a function', () => {
    expect(user).to.be.a('function');
    expect(user).to.be.an.instanceof(User);
  });

  it('should have a name', () => {
    expect(user.name).to.equal('Saige O\'Kon');
  });

  it('should have an id', () => {
    expect(user.id).to.equal(1);
  });

  it('should have a pantry', () => {
    expect(user.pantry).to.be.an('array');
    expect(user.pantry[0].amount).to.equal(4);
    expect(user.pantry.ingredient).to.equal(11297);
  });

  it('should have a list of favorite recipes', () => {
    expect(user.favorites).to.be.an('array');
  });

  it('should be able to add recipes to thier list of favorites', () => {
    user.addToFavorites(wings);
    expect(user.favorites).to.be.an('array');
    expect(user.favorites.length).to.equal(1);
    expect(user.favorites[0].id).to.equal(10);
    expect(user.favorites[0]).to.be.an.instanceof(Recipe);
  });

  it('should be able to remove recipes from thier favorites', () => {
    user.addToFavorites(wings);
    user.addToFavorites(grilledCheese);
    expect(user.favorites.length).to.equal(2);
    user.removeFromFavorites(wings);
    expect(user.favorties.length).to.equal(1);
  })

  it('should have a cookbook', () => {
    expect(user.cookbook).to.be.an('array');
  });

  it('should be able to add recipes to thier cookbook', () => {
    user.addToCookbook(grilledCheese);
    expect(user.cookbook.length).to.equal(1);
    expect(user.cookbook[0]).to.be.an.instanceof(Recipe);
  });

  it('should be able to remove recipes from thier cookbook', () => {
    user.addToCookbook(wings);
    user.addToCookbook(grilledCheese);
    expect(user.cookbook.length).to.equal(2);
    user.removeFromCookbook(wings);
    expect(user.cookbook.length).to.equal(1);
  });
})