import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import userData from '../src/data/users-test-data';
import recipesData from '../src/data/recipe-test-data.js';
import ingredientsData from '../src/data/ingredients-test-data';

describe('User', () => {

  let user;
  let grilledCheese;
  let wings;

  beforeEach(() => {
    user = new User(userData[0]);
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
      ingredientsData)
  })

  it('should be a function', () => {
    expect(User).to.be.a('function');
    expect(user).to.be.an.instanceof(User);
  });
  
  it('should have a name', () => {
    expect(user.name).to.equal('Saige O\'Kon');
  });

  it('should have a default name if no name is supplied', () => {
    const user1 = new User({});
    expect(user1.name).to.equal('Guest User');
  });

  it('should have an id', () => {
    expect(user.id).to.equal(1);
  });

  it('should have a default id if no id is supplied', () => {
    const user1 = new User({});
    expect(user1.id).to.equal(0);
  });

  it('should have a pantry', () => {
    expect(user.pantry).to.be.an('array');
    expect(user.pantry[0].amount).to.equal(4);
    expect(user.pantry[0].ingredient).to.equal(11297);
  });

  it('should have an empty pantry if no pantry is supplied', () => {
    const user1 = new User({});
    expect(user1.pantry).to.deep.equal([]);
  });

  it('should have a list of favorite recipes', () => {
    expect(user.favorites).to.be.an('array');
  });

  it('should be able to add recipes to thier list of favorites', () => {
    user.addToFavorites(wings);
    expect(user.favorites).to.be.an('array');
    expect(user.favorites.length).to.equal(1);
    expect(user.favorites[0].id).to.equal(11);
    expect(user.favorites[0]).to.be.an.instanceof(Recipe);
  });

  it('should be able to remove recipes from thier favorites', () => {
    user.addToFavorites(wings);
    user.addToFavorites(grilledCheese);
    expect(user.favorites.length).to.equal(2);
    user.removeFromFavorites(wings);
    expect(user.favorites.length).to.equal(1);
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
});