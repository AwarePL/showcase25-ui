import { RegistrationPage } from '../../pages/RegistrationPage'

describe('Registration Page Smoke Tests', () => {
  const registerPage = new RegistrationPage()

  beforeEach(() => {
    cy.setDismissCookies()
    registerPage.visit()
  })

  context('Positive Tests', () => {
    // toDo
  })

  context('Negative Tests', () => {
    // toDo
  })
})
