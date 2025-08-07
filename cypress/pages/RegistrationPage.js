/**
 * Represents the Registration Page.
 * Contains all the elements and actions related to the registration page.
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
   * Visits the registration page.
   */
  visit() {
    cy.visit('/#/register')
  }

  /**
   * Fills the email input.
   * @param {string} email - The email to fill.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  fillEmail(email) {
    return cy.get(this.emailInput).type(email)
  }

  /**
   * Fills the password input.
   * @param {string} password - The password to fill.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  fillPassword(password) {
    return cy.get(this.passwordInput).type(password)
  }

  /**
   * Fills the repeat password input.
   * @param {string} password - The password to fill.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  fillRepeatPassword(password) {
    return cy.get(this.repeatPasswordInput).type(password)
  }

  /**
   * Selects a security question.
   * @param {string} [option] - The security question option to select. Defaults to "Name of your favorite pet?".
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
   * Fills the security answer input.
   * @param {string} answer - The answer to fill.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  fillAnswer(answer) {
    return cy.get(this.securityAnswerInput).type(answer)
  }

  /**
   * Submits the registration form.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  submit() {
    return cy.get(this.registerButton).click()
  }
}
