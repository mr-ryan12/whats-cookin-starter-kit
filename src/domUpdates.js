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
}

export default domUpdates;