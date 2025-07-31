import { LoginPage } from '../pages/LoginPage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { DashboardPage } from '../pages/DashboardPage'

export class UserActions {
  static login(username, password) {
    const loginPage = new LoginPage()
    return loginPage.login(username, password)
  }

  static goToEmailRegistration() {
    const loginPage = new LoginPage()
    loginPage.startRegistrationViaEmail()
  }

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

  static goToLogin() {
    const dashboardPage = new DashboardPage()
    dashboardPage.navigateToLogin()
  }
}
