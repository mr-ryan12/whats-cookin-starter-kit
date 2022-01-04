// Fetch requests

const retrieveData = (api) => 
  fetch(`https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${api}`)
    .then(response => response.json())

const usersApi = retrieveData('users');

const recipesApi = retrieveData('recipes');

const ingredientsApi = retrieveData('ingredients');
  
export {usersApi, recipesApi, ingredientsApi};