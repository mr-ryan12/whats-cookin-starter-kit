const show = elements => elements.forEach(element => element.classList.remove('hidden'));
const hide = elements => elements.forEach(element => element.classList.add('hidden'));

const capitalizeFistLetters = string => {
  const arr = string.split(' ')
  const result = arr.map(element => {
    return element.charAt(0).toUpperCase() + element.slice(1)
  })
  return result.join(' ')
}

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

  updateCurrentRecipes(page, source) {
    page.innerHTML = '';
      source.forEach(recipe => {
      page.innerHTML += `
        <section class="individual-recipe-card">
          <section class="recipe-card" id="${recipe.id}">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-card-image">
            <i class="fa fa-heart heart-btn"></i>
            <i class="fa fa-bookmark save-recipe-btn"></i>
          </section>
          <h2 class="recipe-card-title">${recipe.name}</h2>
        </section>`
    });
  },

  greetUser(user, greeting) {
    return greeting.innerText = `Welcome, ${user.name}!`;
  },

  updateBrowsePage(homePage, recipeView, cookbook, browsePage, searchBar, tagInput) {
    hide([homePage, recipeView, cookbook]);
    show([browsePage]);
    searchBar.value = '';
    tagInput.selectedIndex = 0;
  },

  updateRecipeView(recipeTitle, price, recipeRepo, recipeViewImage, recipeId, recipeView, homePage, browsePage, cookbook, canCookMessage, user, cookBtn) {
    recipeTitle.innerText = recipeRepo.recipes.find(recipe => `${recipe.id}` === recipeId).name;
    price.innerText = `$${(recipeRepo.recipes.find(recipe => {
      return `${recipe.id}` === recipeId
    }).calculateRecipeCost() / 100).toFixed(2)}`;
    recipeViewImage.innerHTML = `
      <img src="${recipeRepo.recipes.find(recipe => 
      `${recipe.id}` === recipeId).image}" alt="${recipeRepo.recipes.find(recipe => 
      `${recipe.id}` === recipeId).name}">`
      if(user.pantry.checkForIngredients(recipeRepo.recipes.find(recipe => 
        `${recipe.id}` === recipeId))) {
          cookBtn.disabled = false;
          canCookMessage.innerText = "You can make this recipe";
        } else {
          cookBtn.disabled = true;
          canCookMessage.innerText = "You don't have enough ingredients in your pantry to cook this recipe"
        }
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
      cookbookButton.classList.add('grey');
      allRecipesButton.classList.remove('grey');
    favoritesButton.classList.remove('grey');
    hide([homePage, recipeView, browsePage]);
    show([cookbook]);
    searchBar.value = '';
    tagInput.selectedIndex = 0;
  },

  displayHomeView(cookbookButton, allRecipesButton, favoritesButton, browsePage, recipeView, cookbook, homePage) {
    cookbookButton.classList.remove('grey');
    allRecipesButton.classList.remove('grey');
    favoritesButton.classList.remove('grey');
    hide([browsePage, recipeView, cookbook]);
    show([homePage]);
  },

  updateNavBarButtonColor(cookbookButton, allRecipesButton, favoritesButton, recipeRepo) {
    cookbookButton.classList.remove('grey');
    allRecipesButton.classList.remove('grey');
    favoritesButton.classList.remove('grey');
    recipeRepo.filterState === 'all' ?
      allRecipesButton.classList.add('grey') :
      recipeRepo.filterState === 'favorites' ?
        favoritesButton.classList.add('grey') : null;
  },

  updatePantryView(user, pantry, modal, pantryView) {
    pantry.innerHTML = '';
    user.pantry.ingredients.sort((a,b) => {
      return (a.name > b.name) - (a.name < b.name)
    })
    user.pantry.ingredients.forEach(item => {
      pantry.innerHTML += `
      <li>${capitalizeFistLetters(item.name)} (${item.quantity.amount})</li>
      `
    })
    show([modal, pantryView])
  }, 

  exitModalView(modal, pantryView, shoppingCartView) {
    hide([modal, pantryView, shoppingCartView])
  }, 

  updateShoppingCartView(currentRecipe, shoppingCart, modal, shoppingCartView, user) {
    shoppingCart.innerHTML = '';
    currentRecipe.ingredients.forEach(ingredient => {
      let ing = user.pantry.ingredients.find(ing => ing.id === ingredient.id)
      !ing ? ing = {quantity: {amount: 0}} : null;
      shoppingCart.innerHTML += `
      <div class="cart-item">
        <li>${capitalizeFistLetters(ingredient.name)}</li>
        <input id="${ingredient.id}" class="counter-input" type="number" value="0" min="0"></input>
        <p>(On hand: ${ing.quantity.amount})</p>
      </div>
      `
    });
    show([modal, shoppingCartView]);
  }, 

  resetModal(modal, pantryView, shoppingCartView) {
    hide([modal, pantryView, shoppingCartView])
  }
}

export default domUpdates;