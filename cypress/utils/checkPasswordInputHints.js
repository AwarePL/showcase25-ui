import { faker } from '@faker-js/faker'

/**
 * Handles password input hints by generating a password and extracting the character count from the hint.
 * @param {number} passwordLength - The length of the password to generate.
 * @param {string} passwordInputSelector - CSS selector for the password input field.
 * @param {string} passwordHintSelector - CSS selector for the password hint element.
 * @returns {Cypress.Chainable<number>} A chainable that yields the character count read from the hint.
 */
export const handlePasswordInputHints = (
  passwordLength,
  passwordInputSelector,
  passwordHintSelector,
) => {
  // Generate a random alphanumeric password of the specified length
  const password = faker.internet.password({ length: passwordLength })

  // Type the generated password into the input field
  cy.get(passwordInputSelector).clear().type(password)

  // Get the hint element and extract the character count
  return cy
    .get(passwordInputSelector)
    .parents()
    .find(passwordHintSelector)
    .contains('/')
    .invoke('text')
    .then((text) => {
      const splitText = text.split('/')[0]
      return parseInt(splitText)
    })
}
