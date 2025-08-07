/* eslint-disable no-magic-numbers */
import { faker } from '@faker-js/faker'

/**
 * Generates a new user object with random data and saves it to a fixture file.
 * This command is useful for creating user data for UI-based tests.
 * @returns {Cypress.Chainable<object>} - Yields the generated user object.
 * @example
 * cy.generateUserDetailsFixture().then(user => {
 * cy.log(user.email)
 * })
 */
Cypress.Commands.add('generateUserDetailsFixture', () => {
  // Generate user data with faker
  const user = {
    email: faker.internet.email({ length: 20 }),
    password: faker.internet.password({
      length: 12,
    }),
    favoritePet: faker.animal.dog(),
  }

  // Create a timestamp for a unique filename
  const timestamp = new Date().toISOString().replace(/[:.\s]/g, '-')
  const filename = `generatedTestUser_${timestamp}.json`

  // Save the user to a file in the generated fixtures folder
  const filePath = `cypress/fixtures/generated/${filename}`
  return cy.writeFile(filePath, user).then(() => {
    // Return the user object for use in tests
    return user
  })
})

/**
 * Sets cookies to dismiss the cookie consent and welcome banners,
 * ensuring a clean state before tests that need it.
 * @example
 * cy.setDismissCookies()
 */
Cypress.Commands.add('setDismissCookies', () => {
  cy.setCookie('cookieconsent_status', 'dismiss')
  cy.setCookie('welcomebanner_status', 'dismiss')
})

/**
 * Registers a new user via a direct API call for speed and reliability.
 * It also saves the new user's credentials to a fixture file for debugging.
 * @returns {Cypress.Chainable<object>} - Yields the generated user object (email, password, etc.).
 * @example
 * cy.registerUserViaApi().then(user => {
 * cy.login(user.email, user.password)
 * })
 */
Cypress.Commands.add('registerUserViaApi', () => {
  // Generate dynamic user data
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12, prefix: 'aA1!' }),
    securityAnswer: faker.animal.cat(),
  }

  // Perform the API request to the registration endpoint
  return cy
    .request({
      method: 'POST',
      url: '/api/Users/', // Cypress automatically uses the baseUrl from the config
      body: {
        email: user.email,
        password: user.password,
        passwordRepeat: user.password,
        securityQuestion: {
          id: 7,
          question: 'Name of your favorite pet?',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        securityAnswer: user.securityAnswer,
      },
    })
    .then((response) => {
      // Assert that the registration was successful
      expect(response.status).to.eq(201)

      // Create a unique filename and save user credentials
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const filename = `generatedTestUser_${timestamp}.json`
      const filePath = `cypress/fixtures/generated/${filename}`

      cy.writeFile(filePath, {
        email: user.email,
        password: user.password,
      })

      // Yield the user object to the next command in the chain
      return cy.wrap(user)
    })
})
