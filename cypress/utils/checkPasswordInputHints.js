import { faker } from '@faker-js/faker'
/**
 * Handles password input hints by generating a password and extracting character count from hint
 * @param {number} passwordLenght - The length of the password to generate
 * @param {string} passwordInputSelector - CSS selector for the password input field
 * @param {string} passwordHintSelector - CSS selector for the password hint element
 * @returns {Cypress.Chainable<number>} Chainable number representing the character count from hint
 */
export const handlePasswordInputHints = (passwordLenght, passwordInputSelector, passwordHintSelector) => {
  // Generate a random alphanumeric password of specified length
  const password = faker.internet.password({length: passwordLenght})

  // Type the generated password into the input field
  cy.get(passwordInputSelector).type(password)

  // Get the hint element and extract character count
  return  cy.get(passwordInputSelector).parents().find(passwordHintSelector).contains('/').invoke('text').then((text) => {
        const splitText  = text.split('/')[0]
        return parseInt(splitText)
    })
}
