export class LoginPage {
  constructor() {
    this.usernameInput = '#username'
    this.passwordInput = '#password'
    this.loginButton = 'button[type="submit"]'
    this.errorMessage = '#loginError'
  }

  visit() {
    cy.visit('/') // Adjust based on your app's login URL
  }

  login(username, password) {
    cy.get(this.usernameInput).type(username)
    cy.get(this.passwordInput).type(password)
    cy.get(this.loginButton).click()
  }

  getErrorMessage() {
    return cy.get(this.errorMessage)
  }
}
