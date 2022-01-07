const show = elements => elements.forEach(element => element.classList.remove('hidden'));
const hide = elements => elements.forEach(element => element.classList.add('hidden'));

const domUpdates = {
  updateTags(allTags) {
    tags.innerHTML = '<option value="">Choose a Tag</option>';
    allTags.forEach(tag => {
      tags.innerHTML += `<option value="${tag}">${tag}</option>`
    });
  },

  updateFeaturedRecipe(featuredRecipe, featuredRecipeImg, featuredRecipeName, homePage) {
  featuredRecipeImg.src = featuredRecipe.image;
  featuredRecipeName.innerText = featuredRecipe.name;
  homePage.id = `${featuredRecipe.id}`;
  },

  updateCurrentRecipes(browsePage, recipeRepo, greeting, user) {
    browsePage.innerHTML = '';
    recipeRepo.currentRecipes.forEach(recipe => {
      browsePage.innerHTML += `
        <section class="individual-recipe-card">
          <section class="recipe-card" id="${recipe.id}">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-card-image">
            <i class="fa fa-heart heart-btn"></i>
            <i class="fa fa-bookmark save-recipe-btn"></i>
          </section>
          <h2 class="recipe-card-title">${recipe.name}</h2>
        </section>`
    });
    greeting.innerText = `Welcome, ${user.name}!`;
  },

  updateBrowsePage(homePage, recipeView, cookbook, browsePage, searchBar, tagInput) {
    hide([homePage, recipeView, cookbook]);
    show([browsePage]);
    searchBar.value = '';
    tagInput.selectedIndex = 0;
  },

  updateRecipeView(recipeTitle, price, recipeRepo, recipeViewImage, recipeId, recipeView, homePage, browsePage, cookbook) {
    recipeTitle.innerText = recipeRepo.recipes.find(recipe => `${recipe.id}` === recipeId).name;
    price.innerText = `$${(recipeRepo.recipes.find(recipe => {
      return `${recipe.id}` === recipeId
    }).calculateRecipeCost() / 100).toFixed(2)}`;
    recipeViewImage.innerHTML = `
      <img src="${recipeRepo.recipes.find(recipe => 
      `${recipe.id}` === recipeId).image}" alt="${recipeRepo.recipes.find(recipe => 
      `${recipe.id}` === recipeId).name}">`
    show([recipeView]);
    hide([homePage, browsePage, cookbook]);
  },

  updateIngredientsDisplay(ingredientsList, currentRecipe) {
    ingredientsList.innerHTML = '';
    currentRecipe.ingredients.forEach(ingredient => {
      ingredientsList.innerHTML += 
        `<li>${Math.round(ingredient.quantity.amount * 100) / 100} 
        ${ingredient.quantity.unit} ${ingredient.name}</li>`
    })
  },

  updateDirectionsDisplay(directionsList, currentRecipe) {
    directionsList.innerHTML = '';
    currentRecipe.instructions.forEach(direction => {
      directionsList.innerHTML += `<li>${direction.instruction}</li>`
    })
  },

  updateFilteredRecipes(homePage, recipeView, cookbook, browsePage, searchBar, tagInput) {
    hide([homePage, recipeView, cookbook]);
    show([browsePage]);
    searchBar.value = '';
    tagInput.selectedIndex = 0;
  },

  updateToggle(recipeId, buttons, color) {
    buttons.forEach(button => {
      button.parentNode.id === recipeId ?
        button.classList.toggle(`${color}`) : null;
    })
  },

  updateButtons(list, user, buttons, color, category) {
    list.forEach(recipe => {
      user[category].includes(recipe) ? 
        buttons.forEach(button => {
          button.parentNode.id === `${recipe.id}` ? 
            button.classList.add(`${color}`) : null;
        }) : null;
    });
  },

  updateCookbookView(
    cookbookButton,
    allRecipesButton,
    favoritesButton,
    homePage,
    recipeView,
    browsePage,
    cookbook,
    searchBar,
    tagInput
    ) {
    cookbookButton.classList.add('beige');
    allRecipesButton.classList.remove('beige');
    favoritesButton.classList.remove('beige');
    hide([homePage, recipeView, browsePage]);
    show([cookbook]);
    searchBar.value = '';
    tagInput.selectedIndex = 0;
  },

  
}

export default domUpdates;