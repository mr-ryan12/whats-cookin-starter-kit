import './styles.css';
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';
import {usersApi, recipesApi, ingredientsApi, updatePantry} from './apiCalls';
import domUpdates from './domUpdates';
import Ingredient from './classes/Ingredient';

let user;
let recipeRepo;
let ingredientsData;

const getData = () => {
  Promise.all([usersApi, recipesApi, ingredientsApi])
    .then(data => {
      user = new User(data[0][getRandomIndex(data[0])], data[2]);
      recipeRepo = new RecipeRepository(data[1], data[2]);
      ingredientsData = data[2];
      createCurrentRecipes();
      assignFeaturedRecipe();
      createDropdownTags();
    })
    .catch(err => {
      console.log('something went wrong', err)
      // domUpdates.showErrorMessage(errorMessage, modal)
    });
}

// Query Selectors
const recipeTitle = document.querySelector('#recipe-title');
const price = document.querySelector('#price');
const homePage = document.querySelector('.home-page');
const browsePage = document.getElementById('browse-page');
const recipeView = document.querySelector('.recipe-view');
const ingredientsList = document.querySelector('.ingredients-list');
const directionsList = document.querySelector('.directions-list');
const recipeViewImage = document.querySelector('.recipe-view-img');
const allRecipesButton = document.getElementById('all-recipes-btn');
const favoritesButton = document.getElementById('favorites-btn');
const cookbookButton = document.getElementById('cookbook-btn');
const submitButton = document.getElementById('submit-btn');
const tagInput = document.getElementById('tags');
const searchBar = document.getElementById('search-bar');
const cookbook = document.getElementById('cookbook');
const greeting = document.getElementById('greeting');
const featuredRecipeImg = document.querySelector('.featured-recipe-image');
const featuredRecipeName = document.querySelector('.featured-recipe-name');
const whatsCookin = document.getElementById('whats-cookin');
const tags = document.getElementById('tags');
const pantryButton = document.getElementById('pantry-btn');
const pantry = document.querySelector('.pantry');
const modal = document.querySelector('.modal');
const pantryView = document.querySelector('.pantry-view');
const shoppingCart = document.querySelector('.shopping-cart');
const shoppingCartView = document.querySelector('.shopping-cart-view');
const exitPantryBtn = document.querySelector('.exit-pantry-btn');
const exitModalBtn = document.querySelector('.exit-modal-btn');
const exitErrMsgBtn = document.querySelector('.exit-err-msg-btn');
const shoppingCartBtn = document.getElementById('shopping-cart-btn');
const buyBtn = document.querySelector('.buy-btn');
const canCookMessage = document.getElementById('can-cook-message');
const cookBtn = document.getElementById('cook-btn');
const errorMessage = document.getElementById('error-message');
const errorMessageSec = document.querySelector('.error-message-section');


// Event Listeners
window.addEventListener('load', getData);
allRecipesButton.addEventListener('click', displayBrowsePage);
submitButton.addEventListener('click', filterRecipes);
favoritesButton.addEventListener('click', filterFavorites);
cookbookButton.addEventListener('click', viewCookbook);
featuredRecipeImg.addEventListener('click', showRecipeView);
whatsCookin.addEventListener('click', displayHomeView);
pantryButton.addEventListener('click', viewPantry);
exitModalBtn.addEventListener('click', exitModal);
exitPantryBtn.addEventListener('click', exitModal);
exitErrMsgBtn.addEventListener('click', exitModal);
shoppingCartBtn.addEventListener('click', viewShoppingCart);
buyBtn.addEventListener('click', buyIngredients);
cookBtn.addEventListener('click', cookFood);


//Functions

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createDropdownTags() {
  const allTags = recipeRepo.recipes.reduce((acc, recipe) => {
    recipe.tags.forEach(tag => {
      !acc.includes(tag) ? 
        acc.push(tag) : null;
    });
    return acc;
  }, []);
  allTags.sort()
  domUpdates.updateTags(allTags)
}

function assignFeaturedRecipe() {
  const featuredRecipe = recipeRepo.recipes[getRandomIndex(recipeRepo.recipes)];
  domUpdates.updateFeaturedRecipe(featuredRecipe, featuredRecipeImg, featuredRecipeName, homePage);
}

function createCurrentRecipes() {
  domUpdates.updateCurrentRecipes(browsePage, recipeRepo.currentRecipes);
  domUpdates.greetUser(user, greeting);
  addEventListenerToRecipeCards();
  displayRedHearts(recipeRepo.currentRecipes);
  displayYellowBookmarks(recipeRepo.currentRecipes);
}

function displayBrowsePage() {
  recipeRepo.updateFilterState('all');
  domUpdates.updateNavBarButtonColor(cookbookButton, allRecipesButton, favoritesButton, recipeRepo);
  recipeRepo.clearFilters();
  reassignCurrentRecipes();
  createCurrentRecipes();
  domUpdates.updateBrowsePage(homePage, recipeView, cookbook, browsePage, searchBar, tagInput);
}

function addEventListenerToRecipeCards() {
  const recipeCardImages = document.querySelectorAll('.recipe-card-image');
  const heartButtons = document.querySelectorAll('.heart-btn');
  const saveButtons = document.querySelectorAll('.save-recipe-btn');
  recipeCardImages.forEach(recipeCardImage => {
    recipeCardImage.addEventListener('click', showRecipeView)
  });
  heartButtons.forEach(button => button.addEventListener('click', event => {
    toggleFavorites(event);
  }));
  saveButtons.forEach(button => button.addEventListener('click', event => {
    toggleCookbook(event);
  }));
}

function showRecipeView(event) {
  const recipeId = event.target.parentNode.id;
  const currentRecipe = recipeRepo.recipes.find(recipe => `${recipe.id}` === recipeId);
  recipeRepo.assignCurrentRecipe(currentRecipe);
  domUpdates.updateRecipeView(recipeTitle, price, recipeRepo, recipeViewImage, recipeId, recipeView, homePage, browsePage, cookbook, canCookMessage, user, cookBtn);
  price.innerText = `$${(recipeRepo.recipes.find(recipe => {
    return `${recipe.id}` === recipeId
  }).calculateRecipeCost() / 100).toFixed(2)}`
  displayIngredients(event);
  displayDirections(event);
}

function displayIngredients(event) {
  const recipeId = event.target.parentNode.id;
  const currentRecipe = recipeRepo.recipes.find(recipe => `${recipe.id}` === recipeId);
  domUpdates.updateIngredientsDisplay(ingredientsList, currentRecipe);
}

function displayDirections(event) {
  const recipeId = event.target.parentNode.id;
  const currentRecipe = recipeRepo.recipes.find(recipe => `${recipe.id}` === recipeId);
  domUpdates.updateDirectionsDisplay(directionsList, currentRecipe);
}

function filterRecipes() {
  reassignCurrentRecipes();
  recipeRepo.addTag(tagInput.value);
  recipeRepo.addFilter(searchBar.value);
  recipeRepo.filterRecipes();
  createCurrentRecipes();
  recipeRepo.clearFilters();
  domUpdates.updateFilteredRecipes(homePage, recipeView, cookbook, browsePage, searchBar, tagInput)
}

function reassignCurrentRecipes() {
  recipeRepo.filterState === 'all' ?
    recipeRepo.currentRecipes = recipeRepo.recipes : 
    recipeRepo.filterState === 'favorites' ?
      recipeRepo.currentRecipes = user.favorites : null;
}

function filterFavorites() {
  recipeRepo.updateFilterState('favorites');
  domUpdates.updateNavBarButtonColor(cookbookButton, allRecipesButton, favoritesButton, recipeRepo);
  recipeRepo.clearFilters();
  reassignCurrentRecipes();
  createCurrentRecipes();
  domUpdates.updateFilteredRecipes(homePage, recipeView, cookbook, browsePage, searchBar, tagInput);
}

function toggleFavorites(event) {
  const heartButtons = document.querySelectorAll('.fa-heart');
  const recipeId = event.target.parentNode.id;
  const thisRecipe = recipeRepo.recipes.find(recipe => `${recipe.id}` === recipeId);
  user.favorites.includes(thisRecipe) ? 
    user.removeFromFavorites(thisRecipe) :
    user.addToFavorites(thisRecipe);
  domUpdates.updateToggle(recipeId, heartButtons, 'red');
}

function displayRedHearts(list) {
  const heartButtons = document.querySelectorAll('.fa-heart');
  domUpdates.updateButtons(list, user, heartButtons, 'red', 'favorites');
}

function displayYellowBookmarks(list) {
  const saveButtons = document.querySelectorAll('.fa-bookmark');
  domUpdates.updateButtons(list, user, saveButtons, 'yellow', 'cookbook');
}

function toggleCookbook(event) {
  const saveButtons = document.querySelectorAll('.fa-bookmark');
  const recipeId = event.target.parentNode.id;
  const thisRecipe = recipeRepo.recipes.find(recipe => `${recipe.id}` === recipeId);
  user.cookbook.includes(thisRecipe) ? 
    user.removeFromCookbook(thisRecipe) :
    user.addToCookbook(thisRecipe);
  domUpdates.updateToggle(recipeId, saveButtons, 'yellow');
}

function viewCookbook() {
  createCookbook();
  domUpdates.updateCookbookView(
    cookbookButton,
    allRecipesButton,
    favoritesButton,
    homePage,
    recipeView,
    browsePage,
    cookbook,
    searchBar,
    tagInput
  );
}

function createCookbook() {
  domUpdates.updateCurrentRecipes(cookbook, user.cookbook);
  addEventListenerToRecipeCards();
  displayYellowBookmarks(user.cookbook);
  displayRedHearts(user.cookbook);
}

function displayHomeView() {
  domUpdates.displayHomeView(cookbookButton, allRecipesButton, favoritesButton, browsePage, recipeView, cookbook, homePage);
}

function viewPantry() {
  domUpdates.updatePantryView(user, pantry, modal, pantryView);
}

function exitModal() {
  domUpdates.exitModalView(modal, pantryView, shoppingCartView, errorMessage);
}

function viewShoppingCart() {
  domUpdates.updateShoppingCartView(recipeRepo.currentRecipe, shoppingCart, modal, shoppingCartView, user);
}

function buyIngredients(event) {
  event.preventDefault()
  const counterInputs = document.querySelectorAll('.counter-input');
  counterInputs.forEach(input => {
    const data = { 
      userID: user.id, 
      ingredientID: parseInt(input.id), 
      ingredientModification: parseInt(input.value)
    }
    let newIngredient = user.pantry.ingredients.find(ingredient => {
      return `${ingredient.id}` === input.id
    })
    if (!newIngredient) {
      newIngredient = new Ingredient(parseInt(input.id), {amount: parseInt(input.value), unit: ''}, ingredientsData)
      user.pantry.addIngredient(newIngredient)
    }
    if(parseInt(input.value) > 0) {
      makePostRequest(data, newIngredient, parseInt(input.value));
    }
  })
}

function makePostRequest(data, currentIngredient, amount) {
  updatePantry(data)
    .then(data => {
      user.pantry.updateQuantity(currentIngredient, amount)
      domUpdates.resetModal(modal, pantryView, shoppingCartView, errorMessageSec);
      exitModal();
      domUpdates.updateRecipeView(recipeTitle, price, recipeRepo, recipeViewImage, `${recipeRepo.currentRecipe.id}`, recipeView, homePage, browsePage, cookbook, canCookMessage, user, cookBtn)
      console.log(data);
    })
    .catch(err => {
      domUpdates.showErrorMessage(errorMessageSec, modal, shoppingCartView)
      console.log(err)
    })
}

function cookFood() {
  recipeRepo.currentRecipe.ingredients.forEach(ingredient => {
  const quantity = -ingredient.quantity.amount;
    const data = { 
      userID: user.id, 
      ingredientID: parseInt(ingredient.id), 
      ingredientModification: quantity
    }
    makePostRequest(data, ingredient, quantity);
  })
}
