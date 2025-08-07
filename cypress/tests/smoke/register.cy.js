/* eslint-disable no-magic-numbers */
import { RegistrationPage } from '../../pages/RegistrationPage'
import { generateTestsForStaticElements } from '../../utils/checkStaticView'
import { handlePasswordInputHints } from '../../utils/checkPasswordInputHints'
import { checkPasswordStrength } from '../../utils/checkPasswordStrength'

/**
 * @description Smoke test suite for the Registration Page.
 * It covers the visibility of static elements and the dynamic behavior of password-related UI features.
 */
describe('Registration Page Smoke Tests', () => {
  const registerPage = new RegistrationPage()

  beforeEach(() => {
    cy.setDismissCookies()
    registerPage.visit()
  })

  /**
   * @description A context for tests that verify the visibility and presence of static UI elements on the page.
   */
  context('Static Elements', () => {
    const elementsToTest = [
      { name: 'Email input field', selector: registerPage.emailInput },
      { name: 'Password input field', selector: registerPage.passwordInput },
      {
        name: 'Repeat password input field',
        selector: registerPage.repeatPasswordInput,
      },
      {
        name: 'Security question select',
        selector: registerPage.securityQuestionSelect,
      },
      {
        name: 'Security question answer input field',
        selector: registerPage.securityAnswerInput,
      },
      { name: 'Register button', selector: registerPage.registerButton },
      {
        name: 'Already a customer? link',
        selector: registerPage.alreadyACustomerLink,
      },
    ]

    generateTestsForStaticElements(elementsToTest, 'Registration page')

    it('should display "User Registration" as the main heading', () => {
      cy.get('h1').should('contain.text', 'User Registration')
    })
  })

  /**
   * @description A context for tests that check the functionality of the password length hint.
   */
  context('Password Hints', () => {
    const passwordLengths = [5, 10]
    passwordLengths.forEach((length) => {
      /**
       * @description Verifies that the password hint correctly reflects the number of characters typed.
       */
      it(`should display a hint with ${length} characters for the password`, () => {
        handlePasswordInputHints(
          length,
          registerPage.passwordInput,
          registerPage.passwordHint,
        ).then((hintLength) => {
          expect(length).to.equal(hintLength)
        })
      })
    })
  })

  /**
   * @description A context for tests that verify the password strength progress bar.
   */
  context('Password Strength', () => {
    checkPasswordStrength()
  })
})
