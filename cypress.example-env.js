//This is an example file to present how cypress.env.js file is structured, in order to use it in your project, you need to rename this file and fill it with your own data.

export default {
  projectId: 'yourKey',
  dev: {
    baseUrl: 'https://juice-shop.herokuapp.com',
    apiUrl: 'https://juice-shop.herokuapp.com/rest',
  },
  staging: {
    baseUrl: 'https://juice-shop.herokuapp.com',
    apiUrl: 'https://juice-shop.herokuapp.com/rest',
  },
  prod: {
    baseUrl: 'https://juice-shop.herokuapp.com',
    apiUrl: 'https://juice-shop.herokuapp.com/rest',
  },
}
