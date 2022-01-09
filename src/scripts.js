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
    .catch(err => console.log('something went wrong', err));
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
const shoppingCartBtn = document.getElementById('shopping-cart-btn');
const buyBtn = document.querySelector('.buy-btn');
const canCookMessage = document.getElementById('can-cook-message');
const cookBtn = document.getElementById('cook-btn');


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
shoppingCartBtn.addEventListener('click', viewShoppingCart);
buyBtn.addEventListener('click', buyIngredients);


//Functions
const show = elements => elements.forEach(element => element.classList.remove('hidden'));
const hide = elements => elements.forEach(element => element.classList.add('hidden'));

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
  domUpdates.exitModalView(modal, pantryView, shoppingCartView);
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
    const ing = recipeRepo.currentRecipe.ingredients.find(ingredient => {
      return `${ingredient.id}` === input.id
    })
    let updateIngredient = new Ingredient(ing.id, {amount: 0, unit: ing.quantity.unit}, ingredientsData)
    // ing.quantity.amount = 0;
    if(parseInt(input.value) > 0) {
      updatePantry(data)
      .then(data => {
        user.pantry.addIngredient(updateIngredient)
        user.pantry.updateQuantity(updateIngredient, parseInt(input.value))
        console.log(data);
      })
      .catch(err => console.log(err))
    }
  })
  let foundRecipe = recipeRepo.recipes.find(recipe => recipe.id === recipeRepo.currentRecipe.id)
  let foundRecipeId = `${foundRecipe.id}`
  domUpdates.updateRecipeView(recipeTitle, price, recipeRepo, recipeViewImage, foundRecipeId, recipeView, homePage, browsePage, cookbook, canCookMessage, user, cookBtn)
  domUpdates.resetModal(modal, pantryView, shoppingCartView);
  // domUpdates.updatePantryView(user, pantry, modal, pantryView);
  // let currentUser = user;
  // domUpdates.resetModal(modal, pantryView, shoppingCartView);
  // usersApi.then(data => {
  //   user = new User(data.find(person => person.id === user.id), data)
  // })
  // const recipeId = recipeRepo.recipes.find(recipe => `${recipe.id}` === recipeId);
  // Need to figure out recipeId to pass into the function below
  // domUpdates.updateRecipeView(recipeTitle, price, recipeRepo, recipeViewImage, recipeRepo.currentRecipe.id, recipeView, homePage, browsePage, cookbook, canCookMessage, user, cookBtn);
  // let foundRecipe = recipeRepo.recipes.find(recipe => recipe.id === recipeRepo.currentRecipe.id)
  // let foundRecipeId = `${foundRecipe.id}`
  // domUpdates.updateRecipeView(recipeTitle, price, recipeRepo, recipeViewImage, foundRecipeId, recipeView, homePage, browsePage, cookbook, canCookMessage, user, cookBtn)
  // domUpdates.resetModal(modal, pantryView, shoppingCartView);
  // domUpdates.updatePantryView(user, pantry, modal, pantryView);
  // user.pantry.ingredients = user.pantry.buildPantry();
}

// function updateUserData() {
//   Promise.all([usersApi, ingredientsApi])
//     .then(data => {
//       user = new User(data[0].find(person => person.id === user.id), data[1])
//       console.log('DATA><><<><>>>>', data)
//       console.log('USER<><><><>>>>', user)
//     })
//     .catch(err => console.log(err))
// }