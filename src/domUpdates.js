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

}

export default domUpdates;