import { LoginPage } from '../../pages/LoginPage'
import { generateTestsForStaticElements } from '../../utils/checkStaticView'

describe('Login Page Smoke Tests', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    cy.setDismissCookies()
    loginPage.visit()
    cy.intercept('POST', '**/login').as('login')
  })

  context('Positive Tests', () => {
    const elementsToTest = [
      { name: 'Email input field', selector: loginPage.emailInput },
      { name: 'Password input field', selector: loginPage.passwordInput },
      { name: 'Show password button', selector: loginPage.showPassworButton },
      {
        name: 'Forgot password link',
        selector: loginPage.forgotPasswordLink,
      },
      { name: 'Login button', selector: loginPage.loginButton },
      { name: 'Remember me checkbox', selector: loginPage.remeberMeCheckbox },
      {
        name: 'Google login button',
        selector: loginPage.loginViaGoogleButton,
      },
      { name: 'Register link', selector: loginPage.registerLink },
    ]
    generateTestsForStaticElements(elementsToTest, 'Login page')

    it('Main heading should be Login', () => {
      cy.get('h1').should('contain.text', 'Login')
    })
  })
  context('Negative Tests', () => {
    it('Should show error message with invalid credentials, login should be unsucessful', () => {
      loginPage.login('invalid@example.com', 'wrongpassword')
      cy.get(loginPage.errorMessage).should(
        'contain.text',
        'Invalid email or password.',
      )
      cy.get('@login').its('response.statusCode').should('eq', 401)
    })

    it('Should disable Login button for empty login and password fields', () => {
      cy.get(loginPage.loginButton).should(
        'have.class',
        'mat-mdc-button-disabled',
      )
    })

    it('Should show validation errors for empty fields', () => {
      loginPage.getFormValidationMessage()
      cy.get(loginPage.emailInput).should('have.class', 'ng-invalid')
      cy.get(loginPage.passwordInput).should('have.class', 'ng-invalid')
    })
  })
})
