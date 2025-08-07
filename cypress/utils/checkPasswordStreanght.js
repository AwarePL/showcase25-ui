/* eslint-disable no-magic-numbers */
/**
 * Checks password strength based on various criteria and expected strength values
 * @param {number} expectedStreanght - The expected password strength value (0, 20, 40, 60, 80, or 100)
 * @param {string} improvmentDescription - Description of the password improvement criteria
 * @returns {void}
 */
import { RegistrationPage } from '../pages/RegistrationPage'
import { faker } from '@faker-js/faker'

export const checkPasswordStreanght = (
  expectedStreanght,
  improvmentDescription,
) => {
  const registerPage = new RegistrationPage()

  // Regex expression to validate password contains all required character types
  const passwordPattern = new RegExp(
    /[A-Za-z\d!@#$%^&*]/
  )

  /**
   * Asserts the current password strength matches the expected value
   * @param {number} expected - The expected password strength value
   * @returns {void}
   */
  const assertCurrentPasswordStreanght = (expected) => {
    cy.get(registerPage.passwordStreangtProgressBar)
      .invoke('attr', 'aria-valuenow')
      .then(($currentPasswordStreanght) => {
        expect(parseInt($currentPasswordStreanght)).to.equal(expected)
      })
  }

  // Test cases for different password strength levels
  const elementsList = [
    { expectedStreanght: 0, improvmentDescription: 'empty password' },
    { expectedStreanght: 20, improvmentDescription: 'lowercase letters only' },
    {
      expectedStreanght: 40,
      improvmentDescription: 'lowercase letters only 8 or more characters',
    },
    {
      expectedStreanght: 60,
      improvmentDescription: 'lowercase and uppercase letters',
    },
    { expectedStreanght: 80, improvmentDescription: 'letters and numbers' },
    {
      expectedStreanght: 100,
      improvmentDescription: 'letters, numbers and special characters',
    },
  ]

  // Input validation
  if (!Array.isArray(elementsList)) {
    throw new Error('elementsList must be an array')
  }

  elementsList.forEach(({ expectedStreanght, improvmentDescription }) => {
    if (typeof expectedStreanght !== 'number') {
      throw new Error('expectedStreanght must be a number')
    }

    if (typeof improvmentDescription !== 'string') {
      throw new Error('improvmentDescription must be a string')
    }

    it(`Should increase password strength to ${expectedStreanght} when password consists of ${improvmentDescription}`, () => {
      // Clear previous input
    //   cy.get(registerPage.passwordInput).clear()

      if (expectedStreanght === 20) {
        cy.get(registerPage.passwordInput).type(
          faker.string.alpha({ casing: 'lower', length: { min: 1, max: 5 } }),
        )
        assertCurrentPasswordStreanght(expectedStreanght)
      } else if (expectedStreanght === 40) {
        cy.get(registerPage.passwordInput).type(
          faker.string.alpha({ casing: 'lower', length: { min: 8, max: 12 } }),
        )
        assertCurrentPasswordStreanght(expectedStreanght)
      } else if (expectedStreanght === 60) {
        cy.get(registerPage.passwordInput).type(
          faker.string.alpha({ casing: 'mixed', length: { min: 8, max: 12 } }),
        )
        assertCurrentPasswordStreanght(expectedStreanght)
      } else if (expectedStreanght === 80) {
        cy.get(registerPage.passwordInput).type(
          faker.string.alphanumeric({
            casing: 'mixed',
            length: { min: 8, max: 12 },
          }),
        )
        assertCurrentPasswordStreanght(expectedStreanght)
      } else if (expectedStreanght === 100) {
        cy.get(registerPage.passwordInput).type(
          faker.internet.password({ length: 12, pattern: passwordPattern }),
        )
        assertCurrentPasswordStreanght(expectedStreanght)
      } else if (expectedStreanght === 0) {
        assertCurrentPasswordStreanght(expectedStreanght)
      } else {
        throw new Error(
          'invalid input, expectedStreanght must equal 0, 20, 40, 60, 80 or 100',
        )
      }
    })
  })
}
