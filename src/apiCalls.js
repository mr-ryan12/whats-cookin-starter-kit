// Fetch requests

const retrieveData = (api) => 
  fetch(`http://localhost:3001/api/v1/${api}`)
    .then(response => response.json())

const usersApi = retrieveData('users');

const recipesApi = retrieveData('recipes');

const ingredientsApi = retrieveData('ingredients');
  
export {usersApi, recipesApi, ingredientsApi};