/**
 * Represents the Login Page.
 * Contains all the elements and actions related to the login page.
 */
export class LoginPage {
  constructor() {
    this.emailInput = '#email'
    this.passwordInput = '#password'
    this.showPasswordButton =
      'button[aria-label="Button to display the password"]'
    this.forgotPasswordLink = 'a.forgot-pw'
    this.loginButton = '#loginButton'
    this.rememberMeCheckbox = '#rememberMe'
    this.loginViaGoogleButton = '#loginButtonGoogle'
    this.registerLink = 'a.primary-link[routerlink="/register"]'
    this.errorMessage = '.error'
    this.formValidationMessage = 'mat-error'
  }

  /**
   * Visits the login page.
   */
  visit() {
    cy.visit('/#/login')
  }

  /**
   * Logs in a user with the given credentials.
   * @param {string} username - The user's email.
   * @param {string} password - The user's password.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  login(username, password) {
    cy.get(this.emailInput).type(username)
    cy.get(this.passwordInput).type(password)
    return cy.get(this.loginButton).click()
  }

  /**
   * Starts the registration process via email.
   */
  startRegistrationViaEmail() {
    cy.get(this.registerLink).click()
  }

  /**
   * Gets the error message element.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  getErrorMessage() {
    return cy.get(this.errorMessage)
  }
  /**
   * Triggers and gets the form validation message.
   * This method will trigger validation by typing and clearing the inputs.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  getFormValidationMessage() {
    const inputs = [this.emailInput, this.passwordInput]
    inputs.forEach((element) => {
      cy.get(element).type(' ').clear()
    })
    return cy.get(this.formValidationMessage, { multiple: true })
  }
}
