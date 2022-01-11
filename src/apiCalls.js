// Fetch requests
const throwError = (response) => {
  if (response.ok) {
    return response.json()
  } else {
    throw new Error('Something went wrong. Please come back later and try again.')
  }
}

const retrieveData = (api) => 
  fetch(`http://localhost:3001/api/v1/${api}`)
    .then(response => {
      return response.json()
    })

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
    .then(response => throwError(response));
}
  
export {usersApi, recipesApi, ingredientsApi, updatePantry};