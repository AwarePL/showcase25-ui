/**
 * @class RegistrationPage
 * @description Represents the User Registration Page.
 * It contains all the selectors and methods needed to interact with the registration form.
 */
export class RegistrationPage {
  constructor() {
    this.emailInput = '#emailControl'
    this.passwordInput = '#passwordControl'
    this.repeatPasswordInput = '#repeatPasswordControl'
    this.passwordStrengthProgressBar = 'mat-progress-bar'
    this.passwordStrengthInfoCard = 'app-password-strength-info'
    this.passwordHint = 'mat-hint'
    this.securityQuestionSelect = 'mat-select[name="securityQuestion"]'
    this.securityQuestionSelectOption = 'mat-option[role="option"]'
    this.securityAnswerInput = '#securityAnswerControl'
    this.registerButton = '#registerButton'
    this.alreadyACustomerLink = '#alreadyACustomerLink'
  }

  /**
   * Navigates directly to the registration page.
   */
  visit() {
    cy.visit('/#/register')
  }

  /**
   * Fills in the email input field.
   * @param {string} email - The email to be typed into the field.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  fillEmail(email) {
    return cy.get(this.emailInput).type(email)
  }

  /**
   * Fills in the password input field.
   * @param {string} password - The password to be typed into the field.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  fillPassword(password) {
    return cy.get(this.passwordInput).type(password)
  }

  /**
   * Fills in the repeat password input field.
   * @param {string} password - The password to be typed into the field.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  fillRepeatPassword(password) {
    return cy.get(this.repeatPasswordInput).type(password)
  }

  /**
   * Selects a security question from the dropdown.
   * @param {string} [option='Name of your favorite pet?'] - The text of the security question to select.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  selectSecurityQuestion(option) {
    return cy
      .get(this.securityQuestionSelect)
      .click()
      .then(() => {
        cy.get(this.securityQuestionSelectOption)
          .contains(option || 'Name of your favorite pet?')
          .click()
      })
  }

  /**
   * Fills in the security answer input field.
   * @param {string} answer - The answer to be typed into the field.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  fillAnswer(answer) {
    return cy.get(this.securityAnswerInput).type(answer)
  }

  /**
   * Clicks the register button to submit the form.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  submit() {
    return cy.get(this.registerButton).click()
  }
}
