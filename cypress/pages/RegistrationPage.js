export class RegistrationPage {
  constructor() {
    this.emailInput = '#emailControl'
    this.passwordInput = '#passwordControl'
    this.repeatPasswordInput = '#repeatPasswordControl'
    this.securityQuestionSelect = 'mat-select[name="securityQuestion"]'
    this.securityQuestionSelectOption = 'mat-option[role="option"]'
    this.securityAnswerInput = '#securityAnswerControl'
    this.registerButton = '#registerButton'
  }

  visit() {
    cy.visit('/register')
  }

  fillEmail(email) {
    return cy.get(this.emailInput).type(email)
  }

  fillPassword(password) {
    return cy.get(this.passwordInput).type(password)
  }

  fillRepeatPassword(password) {
    return cy.get(this.repeatPasswordInput).type(password)
  }

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

  fillAnswer(answer) {
    return cy.get(this.securityAnswerInput).type(answer)
  }

  submit() {
    return cy.get(this.registerButton).click()
  }
}
