import { LoginPage } from '../pages/LoginPage'

export class UserActions {
  static login(username, password) {
    const loginPage = new LoginPage()
    loginPage.visit()
    loginPage.login(username, password)
    return loginPage
  }
}
