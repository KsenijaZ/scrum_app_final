const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env: {
    validEmail: 'my@scrum.com',
    validPassword: 'myPass123',
    apiUrl: 'https://cypress-api.vivifyscrum-stage.com/api/v2'
  },
  
  e2e: {
    baseUrl: 'https://cypress.vivifyscrum-stage.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
