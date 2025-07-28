export default {
  "e2e": {
    "baseUrl": "https://juice-shop.herokuapp.com",
    "env": {
      "apiUrl": "https://juice-shop.herokuapp.com/rest"
    },
    "viewportWidth": 1980,
    "viewportHeight": 1080,
    "retries": {
      "runMode": 2,
      "openMode": 1
    },
    "experimentalOrigin": true,
    "experimentalStudio": true,
    "defaultCommandTimeout": 10000,
    "screenshotOnRunFailure": true,
    "video": true,
    "trashAssetsAfterRuns": true,
    "chromeWebSecurity": false,
    "numTestsPerWorker": 100
  }
}