import './styles.css';
import apiCalls from './apiCalls';
import Ingredient from './classes/Ingredient';
import Recipe from './classes/Recipe';
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';
import recipeData from './data/recipes';

const recipeContainer = document.getElementById('recipe-cards-display-container');
window.addEventListener('load', () => {
  buildRecipeRepo();
  displayAllRecipes();
})

const buildRecipeRepo = () => {
  const recipeList = recipeData.reduce((acc, recipe) => {
    acc.push(new Recipe(
      recipe.id,
      recipe.image,
      recipe.ingredients,
      recipe.instructions,
      recipe.name,
      recipe.tags
    ));
    return acc;
  }, []);
  return recipeList;
}

const recipeRepo = new RecipeRepository(buildRecipeRepo());

const displayAllRecipes = () => {
  recipeRepo.recipes.forEach(recipe => {
    recipeContainer.innerHTML += `
      <section class="recipe-card" id=${recipe.id}>
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-card-image">
        <section class="favorite-save-btn-container">
          <button class="heart-btn"><i class="fa fa-heart"></i></button>
          <button class="save-recipe-btn"><i class="fa fa-bookmark"></i></button>
        </section>
        <h2 class="recipe-card-title">${recipe.name}</h2>
      </section>`
  })
}