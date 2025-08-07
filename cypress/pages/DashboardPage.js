/**
 * @class DashboardPage
 * @description Represents the main dashboard or homepage of the application.
 * It contains elements and actions available to the user from the main navigation bar.
 */
export class DashboardPage {
  constructor() {
    this.accountButton = '#navbarAccount'
    this.loginButton = '#navbarLoginButton'
  }

  /**
   * Visits the base URL of the application (the homepage).
   */
  visit() {
    cy.visit('/')
  }

  /**
   * Navigates to the login page by clicking the account button
   * and then the login button from the dropdown menu.
   */
  navigateToLogin() {
    cy.get(this.accountButton)
      .click()
      .then(() => {
        cy.get(this.loginButton).click()
      })
  }
}
