import './styles.css';
import apiCalls from './apiCalls';
import Ingredient from './classes/Ingredient';
import Recipe from './classes/Recipe';
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';
import recipeData from './data/recipes';

const recipeRepo = new RecipeRepository(recipeData);
const recipeContainer = document.getElementById('browse-page');
const recipeTitle = document.querySelector('#recipe-title');
const price = document.querySelector('#price');
const homePage = document.querySelector('.home-page');
const browsePage = document.getElementById('browse-page');
const recipeView = document.querySelector('.recipe-view');
const ingredientsList = document.querySelector('.ingredients-list');
const directionsList = document.querySelector('.directions-list');


const displayCurrentRecipes = () => {
  recipeRepo.recipes.forEach(recipe => {
    recipeContainer.innerHTML += `
      <section class="recipe-card" id="id${recipe.id}">
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-card-image">
        <section class="favorite-save-btn-container">
          <button class="heart-btn"><i class="fa fa-heart"></i></button>
          <button class="save-recipe-btn"><i class="fa fa-bookmark"></i></button>
        </section>
        <h2 class="recipe-card-title">${recipe.name}</h2>
      </section>`
  });
  addEventListenerToRecipeCards();
}


const showRecipeView = (event) => {
  const recipeId = event.target.parentNode.id;
  console.log(recipeId);
  recipeTitle.innerText = recipeRepo.recipes.find(recipe => "id" + recipe.id === recipeId).name;
  price.innerText = recipeRepo.recipes.find(recipe => {
    return "id" + recipe.id === recipeId
  }).calculateCost();
  show([recipeView]);
  hide([homePage, browsePage]);
}

const addEventListenerToRecipeCards = () => {
  const recipeCardId = document.querySelectorAll(".recipe-card");
  recipeCardId.forEach(recipeCard => {
    recipeCard.addEventListener('click', showRecipeView)
  });
}



window.onload = displayCurrentRecipes();

const show = elements => elements.forEach(element => element.classList.remove('hidden'));
const hide = elements => elements.forEach(element => element.classList.add('hidden'));



