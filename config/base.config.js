import { defineConfig } from 'cypress'

export default (_env) => {
  return defineConfig({
    e2e: {
      baseUrl: _env.baseUrl,
      env: {
        apiUrl: _env.apiUrl,
      },
      // ✅ Set default viewport size for consistent testing
      viewportWidth: 1980,
      viewportHeight: 1080,

      // ✅ Enable retries for failed tests (helps with transient issues)
      retries: {
        runMode: 2,
        openMode: 1,
      },

      // ✅ Enable experimental features for better debugging and performance
      experimentalOrigin: true,
      experimentalStudio: true,

      // ✅ Set timeout for commands (adjust based on your app's performance)
      defaultCommandTimeout: 10000,

      // ✅ Enable screenshots and videos for debugging
      screenshotOnRunFailure: true,
      video: true,

      // ✅ Clean up test artifacts after runs
      trashAssetsAfterRuns: true,

      // ✅ Disable Chrome Web Security for testing with insecure origins
      chromeWebSecurity: false,

      // ✅ Set number of tests per worker for parallel execution
      numTestsPerWorker: 100,

      // ✅ Set default pattern for test files
      specPattern: '**/*.cy.js',

      // ✅ Enable support for custom commands and plugins
      setupNodeEvents(on, config) {
        return config
      },
    },
  })
}
