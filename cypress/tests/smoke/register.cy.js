/* eslint-disable no-magic-numbers */
import { RegistrationPage } from '../../pages/RegistrationPage'
import { generateTestsForStaticElements } from '../../utils/checkStaticView'
import { handlePasswordInputHints } from '../../utils/checkPasswordInputHints'
import { checkPasswordStrength } from '../../utils/checkPasswordStrength'

describe('Registration Page Smoke Tests', () => {
  const registerPage = new RegistrationPage()

  beforeEach(() => {
    cy.setDismissCookies()
    registerPage.visit()
  })

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

  context('Password Hints', () => {
    const passwordLengths = [5, 10]
    passwordLengths.forEach((length) => {
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

  context('Password Strength', () => {
    checkPasswordStrength()
  })
})
