import './styles.css';
import apiCalls from './apiCalls';
import Ingredient from './classes/Ingredient';
import Recipe from './classes/Recipe';
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';
import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';
import usersData from './data/users';

const recipeRepo = new RecipeRepository(recipeData, ingredientsData);
const user = new User(usersData[getRandomIndex(usersData)]);
const recipeContainer = document.getElementById('browse-page');
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
const cookbookPageButton = document.getElementById('cookbook-btn');
const submitButton = document.getElementById('submit-btn');
const tagInput = document.getElementById('tags');
const searchBar = document.getElementById('search-bar');

//Event Listeners
window.addEventListener('load', () => createCurrentRecipes);
allRecipesButton.addEventListener('click', displayBrowsePage);
submitButton.addEventListener('click', filterRecipes);
favoritesButton.addEventListener('click', filterFavorites);

//Functions
const show = elements => elements.forEach(element => element.classList.remove('hidden'));

const hide = elements => elements.forEach(element => element.classList.add('hidden'));

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createCurrentRecipes() {
  recipeContainer.innerHTML = '';
  recipeRepo.currentRecipes.forEach(recipe => {
    recipeContainer.innerHTML += `
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

function displayBrowsePage() {
  hide([homePage, recipeView]);
  show([browsePage]);
  recipeRepo.clearFilters();
  searchBar.value = '';
  tagInput.selectedIndex = 0;
  createCurrentRecipes();
}

function addEventListenerToRecipeCards() {
  const recipeCardId = document.querySelectorAll(".recipe-card");
  recipeCardId.forEach(recipeCard => {
    recipeCard.addEventListener('click', showRecipeView)
  });
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
  hide([homePage, browsePage]);
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
  hide([homePage, recipeView]);
  show([browsePage]);
}

function filterFavorites() {
  recipeRepo.clearFilters();
  recipeRepo.currentRecipes = user.favorites;
  createCurrentRecipes();
  hide([homePage, recipeView]);
  show([browsePage]);
  searchBar.value = '';
  tagInput.selectedIndex = 0;
}


