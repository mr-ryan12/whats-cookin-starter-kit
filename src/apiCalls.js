// Your fetch requests will live here!
// Write fetch call
// Export function to scripts.js
// Import function in scripts.js
// Invoke function in scripts.js


const usersApi = 
fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
  .then(response => response.json())

const recipesApi = 
fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
  .then(response => response.json())

const ingredientsApi = 
  fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
    .then(response => response.json())
  

// let usersData = fetchUsers()

  // .then(() => console.log(usersData))
  // .catch(err => console.log('IT BROKE!!!!'))

console.log('here')

export default {usersApi, recipesApi, ingredientsApi};
