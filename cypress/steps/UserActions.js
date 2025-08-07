import { LoginPage } from '../pages/LoginPage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { DashboardPage } from '../pages/DashboardPage'

/**
 * @class UserActions
 * @description A collection of static methods that represent high-level user flows or actions,
 * combining steps from multiple page objects.
 */
export class UserActions {
  /**
   * Logs in a user through the UI.
   * @param {string} username - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  static login(username, password) {
    const loginPage = new LoginPage()
    return loginPage.login(username, password)
  }

  /**
   * Navigates to the email registration page from the login page.
   */
  static goToEmailRegistration() {
    const loginPage = new LoginPage()
    loginPage.startRegistrationViaEmail()
  }

  /**
   * Registers a new user by filling out the UI form with generated data.
   * @returns {Cypress.Chainable<object>} - A Cypress chainable that yields the generated user object.
   */
  static register() {
    return cy.generateUserDetailsFixture().then((user) => {
      const registerPage = new RegistrationPage()
      return registerPage
        .fillEmail(user.email)
        .then(() => registerPage.fillPassword(user.password))
        .then(() => registerPage.fillRepeatPassword(user.password))
        .then(() => registerPage.selectSecurityQuestion())
        .then(() => registerPage.fillAnswer(user.favoritePet))
        .then(() => registerPage.submit())
        .then(() => user)
    })
  }

  /**
   * Navigates to the login page from the main dashboard/homepage.
   */
  static goToLogin() {
    const dashboardPage = new DashboardPage()
    dashboardPage.navigateToLogin()
  }
}
