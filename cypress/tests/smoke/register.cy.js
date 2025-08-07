/* eslint-disable no-magic-numbers */
import { RegistrationPage } from '../../pages/RegistrationPage'
import { generateTestsForStaticElements } from '../../utils/checkStaticView'
import { handlePasswordInputHints } from '../../utils/checkPasswordInputHints'
import { checkPasswordStreanght } from '../../utils/checkPasswordStreanght'

describe('Registration Page Smoke Tests', () => {
  const registerPage = new RegistrationPage()

  beforeEach(() => {
    cy.setDismissCookies()
    registerPage.visit()
  })

  context('Positive Tests', () => {
    const elementsToTest = [
      { name: 'Email input field', selector: registerPage.emailInput },
      { name: 'Password input field', selector: registerPage.passwordInput },
      {
        name: 'Repeat password input field',
        selector: registerPage.repeatPasswordInput,
      },
      {
        name: 'Select securinty question select',
        selector: registerPage.securityQuestionSelect,
      },
      {
        name: 'Securinty question answer input field',
        selector: registerPage.securityAnswerInput,
      },

      { name: 'Register button', selector: registerPage.registerButton },
      {
        name: 'Already a customer? link',
        selector: registerPage.alreadyACustomerLinkAcorn,
      },
    ]

    const passwordLengths = [5, 10]
    generateTestsForStaticElements(elementsToTest, 'Registration page')
    it('Main heading should be Registration', () => {
      cy.get('h1').should('contain.text', 'User Registration')
    })

    passwordLengths.forEach((length) => {
      it(`Password hint should display ${length} characters`, () => {
        handlePasswordInputHints(
          length,
          registerPage.passwordInput,
          registerPage.passwordHint,
        ).then((hintLength) => {
          expect(length).to.equal(hintLength)
        })
      })
    })
      checkPasswordStreanght()

    //   context('Negative Tests', () => {
    //     // toDo
    //   })
  })
})
