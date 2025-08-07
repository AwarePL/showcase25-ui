import { RegistrationPage } from '../pages/RegistrationPage'
import { faker } from '@faker-js/faker'

/**
 * Checks the password strength based on different criteria.
 * @param {number} expectedStrength - The expected password strength value (0, 20, 40, 60, 80, or 100).
 */
const assertCurrentPasswordStrength = (expected) => {
  const registerPage = new RegistrationPage()
  cy.get(registerPage.passwordStrengthProgressBar)
    .invoke('attr', 'aria-valuenow')
    .then(($currentPasswordStrength) => {
      expect(parseInt($currentPasswordStrength)).to.equal(expected)
    })
}

/**
 * Checks the password strength by typing different passwords and asserting the strength bar value.
 */
export const checkPasswordStrength = () => {
  const registerPage = new RegistrationPage()
  const passwordPattern = new RegExp(/[A-Za-z\d!@#$%^&*]/)

  const testCases = [
    {
      strength: 20,
      description: 'lowercase letters only',
      password: faker.string.alpha({
        casing: 'lower',
        length: { min: 1, max: 5 },
      }),
    },
    {
      strength: 40,
      description: 'lowercase letters only, 8 or more characters',
      password: faker.string.alpha({
        casing: 'lower',
        length: { min: 8, max: 12 },
      }),
    },
    {
      strength: 60,
      description: 'lowercase and uppercase letters',
      password: faker.string.alpha({
        casing: 'mixed',
        length: { min: 8, max: 12 },
      }),
    },
    {
      strength: 80,
      description: 'letters and numbers',
      password: faker.string.alphanumeric({
        casing: 'mixed',
        length: { min: 8, max: 12 },
      }),
    },
    {
      strength: 100,
      description: 'letters, numbers and special characters',
      password: faker.internet.password({
        length: 12,
        pattern: passwordPattern,
      }),
    },
  ]

  it('should have password strength of 0 for empty password', () => {
    assertCurrentPasswordStrength(0)
  })

  testCases.forEach(({ strength, description, password }) => {
    it(`should increase password strength to ${strength} for ${description}`, () => {
      cy.get(registerPage.passwordInput).clear().type(password)
      assertCurrentPasswordStrength(strength)
    })
  })
}
