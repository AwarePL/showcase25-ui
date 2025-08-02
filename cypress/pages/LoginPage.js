import { faker } from '@faker-js/faker'
export class LoginPage {
  constructor() {
    this.emailInput = '#email'
    this.passwordInput = '#password'
    this.showPassworButton =
      'button[aria-label="Button to display the password"]'
    this.forgotPasswordLink = 'a.forgot-pw'
    this.loginButton = '#loginButton'
    this.remeberMeCheckbox = '#rememberMe'
    this.loginViaGoogleButton = '#loginButtonGoogle'
    this.registerLink = 'a.primary-link[routerlink="/register"]'
    this.errorMessage = '.error'
    this.formValidationMessage = 'mat-error'
  }

  visit() {
    cy.visit('/#/login')
  }

  login(username, password) {
    cy.get(this.emailInput).type(username)
    cy.get(this.passwordInput).type(password)
    return cy.get(this.loginButton).click()
  }

  startRegistrationViaEmail() {
    cy.get(this.registerLink).click()
  }

  getErrorMessage() {
    return cy.get(this.errorMessage)
  }
  getFormValidationMessage() {
    const inputs = [this.emailInput, this.passwordInput]
    inputs.forEach((element) => {
      cy.get(element).type(' ').clear()
    })
    return cy.get(this.formValidationMessage, { multiple: true })
  }
}
