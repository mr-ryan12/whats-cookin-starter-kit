import './styles.css';
import apiCalls from './apiCalls';
import Ingredient from './classes/Ingredient';
import Recipe from './classes/Recipe';
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';
import recipeData from './data/recipes';
// import ingredientsData from './data/ingredients';
import usersData from './data/users';
import {usersApi, recipesApi, ingredientsApi} from './apiCalls';





usersApi.then(data => {
  localStorage.setItem('user', JSON.stringify(data.usersData[getRandomIndex(data.usersData)]))
});

recipesApi.then(data => {
  localStorage.setItem('recipes', JSON.stringify(data.recipeData))
});

ingredientsApi.then(data => {
  localStorage.setItem('ingredients', JSON.stringify(data.ingredientsData))
});



const recipeRepo = new RecipeRepository(
  JSON.parse(localStorage.getItem('recipes')), 
  JSON.parse(localStorage.getItem('ingredients')));
const user = new User(JSON.parse(localStorage.getItem('user')))
// console.log(user);
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

//Event Listeners
window.addEventListener('load', createCurrentRecipes);
allRecipesButton.addEventListener('click', displayBrowsePage);
submitButton.addEventListener('click', filterRecipes);
favoritesButton.addEventListener('click', filterFavorites);
cookbookButton.addEventListener('click', viewCookbook);

//Functions
const show = elements => elements.forEach(element => element.classList.remove('hidden'));

const hide = elements => elements.forEach(element => element.classList.add('hidden'));

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createCurrentRecipes() {
  browsePage.innerHTML = '';
  recipeRepo.currentRecipes.forEach(recipe => {
    browsePage.innerHTML += `
      <section class="individual-recipe-card">
        <section class="recipe-card" id="id${recipe.id}">
          <img src="${recipe.image}" alt="${recipe.name}" class="recipe-card-image">
          <section class="favorite-save-btn-container">
            <button class="heart-btn"><i class="fa fa-heart"></i></button>
            <button class="save-recipe-btn"><i class="fa fa-bookmark"></i></button>
          </section>
        </section>
        <h2 class="recipe-card-title">${recipe.name}</h2>
      </section>`
  });
  addEventListenerToRecipeCards();
  greeting.innerText = `Welcome, ${user.name}!`
}

function displayBrowsePage() {
  hide([homePage, recipeView, cookbook]);
  show([browsePage]);
  recipeRepo.clearFilters();
  searchBar.value = '';
  tagInput.selectedIndex = 0;
  createCurrentRecipes();
}

function addEventListenerToRecipeCards() {
  const recipeCardImages = document.querySelectorAll(".recipe-card-image");
  const heartButtons = document.querySelectorAll('.heart-btn');
  const saveButtons = document.querySelectorAll('.save-recipe-btn');
  recipeCardImages.forEach(recipeCardImage => {
    recipeCardImage.addEventListener('click', showRecipeView)
  });
  heartButtons.forEach(button => button.addEventListener('click', (event) => {
    toggleFavorites(event);
  }));
  saveButtons.forEach(button => button.addEventListener('click', event => {
    toggleCookbook(event);
  }));
}

function showRecipeView(event) {
  const recipeId = event.target.parentNode.id;
  recipeTitle.innerText = recipeRepo.recipes.find(recipe => "id" + recipe.id === recipeId).name;
  price.innerText = `$${(recipeRepo.recipes.find(recipe => {
    return "id" + recipe.id === recipeId
  }).calculateRecipeCost() / 100).toFixed(2)}`;
  recipeViewImage.innerHTML = `
    <img src="${recipeRepo.recipes.find(recipe => "id" + recipe.id === recipeId).image}" alt="${recipeRepo.recipes.find(recipe => "id" + recipe.id === recipeId).name}">`
  show([recipeView]);
  hide([homePage, browsePage, cookbook]);
  displayIngredients(event);
  displayDirections(event);
}

function displayIngredients(event) {
  ingredientsList.innerHTML = '';
  const recipeId = event.target.parentNode.id;
  const currentRecipe = recipeRepo.recipes.find(recipe => 'id' + recipe.id === recipeId);
  currentRecipe.ingredients.forEach(ingredient => {
    ingredientsList.innerHTML += `<li>${ingredient.quantity.amount} ${ingredient.quantity.unit} ${ingredient.name}</li>`
  })
}

function displayDirections(event) {
  directionsList.innerHTML = '';
  const recipeId = event.target.parentNode.id;
  const currentRecipe = recipeRepo.recipes.find(recipe => 'id' + recipe.id === recipeId);
  currentRecipe.instructions.forEach(direction => {
    directionsList.innerHTML += `<li>${direction.instruction}</li>`
  })
}

function filterRecipes() {
  recipeRepo.addTag(tagInput.value);
  recipeRepo.addFilter(searchBar.value);
  recipeRepo.filterRecipes();
  createCurrentRecipes();
  hide([homePage, recipeView, cookbook]);
  show([browsePage]);
}

function filterFavorites() {
  recipeRepo.clearFilters();
  recipeRepo.currentRecipes = user.favorites;
  createCurrentRecipes();
  hide([homePage, recipeView, cookbook]);
  show([browsePage]);
  searchBar.value = '';
  tagInput.selectedIndex = 0;
}

function toggleFavorites(event) {
  const heartButtons = document.querySelectorAll('.fa-heart');
  const recipeId = event.target.parentNode.parentNode.parentNode.id;
  const thisRecipe = recipeRepo.currentRecipes.find(recipe => "id" + recipe.id === recipeId);
  user.favorites.includes(thisRecipe) ? 
    user.removeFromFavorites(thisRecipe) :
    user.addToFavorites(thisRecipe);
  heartButtons.forEach(button => {
    button.parentNode.parentNode.parentNode.id === recipeId ?
      button.classList.toggle('red') : null;
  })
}

function toggleCookbook(event) {
  const saveButtons = document.querySelectorAll('.fa-bookmark');
  const recipeId = event.target.parentNode.parentNode.parentNode.id;
  const thisRecipe = recipeRepo.currentRecipes.find(recipe => "id" + recipe.id === recipeId);
  user.cookbook.includes(thisRecipe) ? 
    user.removeFromCookbook(thisRecipe) :
    user.addToCookbook(thisRecipe);
  saveButtons.forEach(button => {
    button.parentNode.parentNode.parentNode.id === recipeId ?
      button.classList.toggle('yellow') : null;
  })
}

function viewCookbook() {
  createCookbook();
  hide([homePage, recipeView, browsePage]);
  show([cookbook]);
  searchBar.value = '';
  tagInput.selectedIndex = 0;
}

function createCookbook() {
  cookbook.innerHTML = '';
  user.cookbook.forEach(recipe => {
    cookbook.innerHTML += `
      <section class="individual-recipe-card">
        <section class="recipe-card" id="id${recipe.id}">
          <img src="${recipe.image}" alt="${recipe.name}" class="recipe-card-image">
          <section class="favorite-save-btn-container">
            <button class="heart-btn"><i class="fa fa-heart"></i></button>
            <button class="save-recipe-btn"><i class="fa fa-bookmark"></i></button>
          </section>
        </section>
        <h2 class="recipe-card-title">${recipe.name}</h2>
      </section>`
  });
  addEventListenerToRecipeCards();
}