// Fetch requests

const usersApi = 
fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
  .then(response => response.json())

const recipesApi = 
fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
  .then(response => response.json())

const ingredientsApi = 
  fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
    .then(response => response.json())
  
export {usersApi, recipesApi, ingredientsApi};