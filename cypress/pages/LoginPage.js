/**
 * @class LoginPage
 * @description Represents the Login Page of the application.
 * It contains all the selectors and methods to interact with the login form.
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
   * Navigates directly to the login page.
   */
  visit() {
    cy.visit('/#/login')
  }

  /**
   * Fills the login form and submits it.
   * @param {string} username - The user's email to type into the email field.
   * @param {string} password - The user's password to type into the password field.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  login(username, password) {
    cy.get(this.emailInput).type(username)
    cy.get(this.passwordInput).type(password)
    return cy.get(this.loginButton).click()
  }

  /**
   * Clicks the link to navigate to the registration page.
   */
  startRegistrationViaEmail() {
    cy.get(this.registerLink).click()
  }

  /**
   * Gets the main error message element displayed on login failure.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  getErrorMessage() {
    return cy.get(this.errorMessage)
  }

  /**
   * Triggers form validation messages by interacting with the input fields
   * and then returns the validation message elements.
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
