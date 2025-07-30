export class DashboardPage {
  constructor() {
    this.accountButton = '#navbarAccount'
    this.loginButton = '#navbarLoginButton'
  }

  visit() {
    cy.visit('/') // Adjust based on your app's login URL
  }

  navigateToLogin() {
    cy.get(this.accountButton)
      .click()
      .then(() => {
        cy.get(this.loginButton).click()
      })
  }
}
