import { defineConfig } from 'cypress'

/**
 * @file Base Cypress configuration file.
 * @description This function returns a Cypress configuration object. It's designed to be
 * merged with environment-specific variables (like baseUrl and apiUrl) passed in via the _env parameter.
 * This setup allows for a clean separation of concerns between base settings and environment settings.
 *
 * @param {object} _env - An object containing environment-specific variables (e.g., from cypress.env.js).
 * @returns {object} The complete Cypress configuration object.
 */
export default (_env) => {
  return defineConfig({
    projectId: _env.projectId,
    e2e: {
      baseUrl: _env.baseUrl,
      env: {
        apiUrl: _env.apiUrl,
      },

      // Sets the default browser viewport size for all tests.
      // Ensures visual consistency across runs.
      viewportWidth: 1920,
      viewportHeight: 1080,

      // Configures test retries to handle flaky tests.
      // `runMode`: Number of retries when running via `cypress run`.
      // `openMode`: Number of retries when running via `cypress open`.
      retries: {
        runMode: 2,
        openMode: 1,
      },

      // Enables experimental Cypress features that can improve performance and debugging.
      experimentalOrigin: true,
      experimentalStudio: true,

      // The default timeout for most Cypress commands (in milliseconds).
      // Helps prevent tests from failing due to slow network or application responses.
      defaultCommandTimeout: 10000,

      // Automatically captures a screenshot when a test fails during `cypress run`.
      screenshotOnRunFailure: true,
      // Records a video of the entire test run.
      video: true,

      // Automatically deletes screenshots and videos from previous runs to save space.
      trashAssetsAfterRuns: true,

      // Disables Chrome's web security to allow for easier testing of cross-origin requests.
      chromeWebSecurity: false,

      // An experimental setting for optimizing parallel test execution.
      numTestsPerWorker: 100,

      // The glob pattern Cypress uses to find test files.
      specPattern: 'cypress/tests/**/*.cy.js',

      // A placeholder for Node.js event listeners.
      setupNodeEvents(on, config) {
        return config
      },
    },
  })
}