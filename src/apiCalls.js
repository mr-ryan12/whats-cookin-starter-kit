// Fetch requests

const retrieveData = (api) => 
  fetch(`http://localhost:3001/api/v1/${api}`)
    .then(response => response.json())

const usersApi = retrieveData('users');

const recipesApi = retrieveData('recipes');

const ingredientsApi = retrieveData('ingredients');

const updatePantry = (data) => {
  return fetch("http://localhost:3001/api/v1/users", {
    method: 'POST',
    body: JSON.stringify(data), 
    headers: {
      'Content-Type': 'application/json'
    }
  }) 
  .then(resp => resp.json());
}
  
export {usersApi, recipesApi, ingredientsApi, updatePantry};