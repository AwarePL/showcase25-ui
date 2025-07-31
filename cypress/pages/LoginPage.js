export class LoginPage {
  constructor() {
    this.emailInput = '#email'
    this.passwordInput = '#password'
    this.loginButton = '#loginButton'
    this.registerLink = 'a.primary-link[routerlink="/register"]'
    this.errorMessage = '#loginError'
  }

  visit() {
    cy.visit('/#/login') // Adjust based on your app's login URL
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
}
