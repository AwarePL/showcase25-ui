import { LoginPage } from '../../pages/LoginPage'
import { generateTestsForStaticElements } from '../../utils/checkStaticView'

/**
 * @description Smoke test suite for the Login Page.
 * It covers the visibility of static elements and essential login scenarios.
 */
describe('Login Page Smoke Tests', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    cy.setDismissCookies()
    loginPage.visit()
    cy.intercept('POST', '**/login').as('login')
  })

  /**
   * @description A context for tests that verify the visibility and presence of static UI elements on the page.
   */
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

  /**
   * @description A context for tests that cover functional login scenarios, including positive and negative paths.
   */
  context('Login Scenarios', () => {
    /**
     * @description Verifies that a user can successfully log in with valid credentials created via the API.
     */
    it('should allow a user to log in with valid credentials', () => {
      cy.registerUserViaApi().then((user) => {
        loginPage.login(user.email, user.password)
        cy.wait('@login').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/#/search')
      })
    })

    /**
     * @description Ensures that an error message is displayed when a user tries to log in with incorrect credentials.
     */
    it('should show an error message with invalid credentials', () => {
      loginPage.login('invalid@example.com', 'wrongpassword')
      cy.get(loginPage.errorMessage).should(
        'contain.text',
        'Invalid email or password.',
      )
      cy.wait('@login').its('response.statusCode').should('eq', 401)
    })

    /**
     * @description Checks that the login button is disabled by default when the input fields are empty.
     */
    it('should disable the Login button for empty fields', () => {
      cy.get(loginPage.loginButton).should(
        'have.class',
        'mat-mdc-button-disabled',
      )
    })

    /**
     * @description Verifies that form validation errors appear after a user interacts with and clears the input fields.
     */
    it('should show validation errors for empty fields after interaction', () => {
      loginPage.getFormValidationMessage()
      cy.get(loginPage.emailInput).should('have.class', 'ng-invalid')
      cy.get(loginPage.passwordInput).should('have.class', 'ng-invalid')
    })
  })
})
