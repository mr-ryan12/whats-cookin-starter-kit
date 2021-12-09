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
      <section class="recipe-card">
        <img src="https://spoonacular.com/recipeImages/595736-556x370.jpg" alt="cookies" class="recipe-card-image">
        <h2 class="recipe-card-title">Cookies!</h2>
        <section class="favorite-save-btn-container">
          <button class="heart-btn"><i class="fa fa-heart"></i></button>
          <button class="save-recipe-btn"><i class="fa fa-bookmark"></i></button>
        </section>
      </section>`
  })
}