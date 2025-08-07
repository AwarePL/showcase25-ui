import { defineConfig } from 'cypress'

/**
 * @file Base Cypress configuration file.
 * @description This function returns a Cypress configuration object. It's designed to be
 * merged with environment-specific variables (like baseUrl and apiUrl) passed in via the _env parameter.
 */
export default (_env) => {
  return defineConfig({
    projectId: _env.projectId,
    e2e: {
      baseUrl: _env.baseUrl,
      env: {
        apiUrl: _env.apiUrl,
      },

      reporter: 'cypress-junit-reporter',
      reporterOptions: {
        mochaFile: 'cypress/reports/junit/results-[hash].xml',
        toConsole: true,
      },

      viewportWidth: 1920,
      viewportHeight: 1080,

      retries: {
        runMode: 2,
        openMode: 1,
      },

      experimentalOrigin: true,
      experimentalStudio: true,

      defaultCommandTimeout: 10000,

      screenshotOnRunFailure: true,
      video: true,

      trashAssetsAfterRuns: true,

      chromeWebSecurity: false,

      numTestsPerWorker: 100,

      specPattern: 'cypress/tests/**/*.cy.js',

      setupNodeEvents(on, config) {
        return config
      },
    },
  })
}
