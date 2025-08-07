import { LoginPage } from '../../pages/LoginPage'
import { generateTestsForStaticElements } from '../../utils/checkStaticView'

describe('Login Page Smoke Tests', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    cy.setDismissCookies()
    loginPage.visit()
    cy.intercept('POST', '**/login').as('login')
  })

  context('Static Elements', () => {
    const elementsToTest = [
      { name: 'Email input field', selector: loginPage.emailInput },
      { name: 'Password input field', selector: loginPage.passwordInput },
      { name: 'Show password button', selector: loginPage.showPasswordButton },
      {
        name: 'Forgot password link',
        selector: loginPage.forgotPasswordLink,
      },
      { name: 'Login button', selector: loginPage.loginButton },
      { name: 'Remember me checkbox', selector: loginPage.rememberMeCheckbox },
      {
        name: 'Google login button',
        selector: loginPage.loginViaGoogleButton,
      },
      { name: 'Register link', selector: loginPage.registerLink },
    ]
    generateTestsForStaticElements(elementsToTest, 'Login page')

    it('should display "Login" as the main heading', () => {
      cy.get('h1').should('contain.text', 'Login')
    })
  })

  context('Login Scenarios', () => {
    it('should allow a user to log in with valid credentials', () => {
      cy.registerUserViaApi().then((user) => {
        loginPage.login(user.email, user.password)
        cy.wait('@login').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/#/search')
      })
    })

    it('should show an error message with invalid credentials', () => {
      loginPage.login('invalid@example.com', 'wrongpassword')
      cy.get(loginPage.errorMessage).should(
        'contain.text',
        'Invalid email or password.',
      )
      cy.wait('@login').its('response.statusCode').should('eq', 401)
    })

    it('should disable the Login button for empty fields', () => {
      cy.get(loginPage.loginButton).should(
        'have.class',
        'mat-mdc-button-disabled',
      )
    })

    it('should show validation errors for empty fields after interaction', () => {
      loginPage.getFormValidationMessage()
      cy.get(loginPage.emailInput).should('have.class', 'ng-invalid')
      cy.get(loginPage.passwordInput).should('have.class', 'ng-invalid')
    })
  })
})
