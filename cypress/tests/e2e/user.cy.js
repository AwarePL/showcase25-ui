import { UserActions } from '../../steps/UserActions.js'

/**
 * @description E2E test suite for critical user journeys in the Juice Shop application.
 */
describe('E2E Tests for Juice Shop', () => {
  beforeEach(() => {
    // Dismiss cookies and navigate to the homepage before each test
    cy.setDismissCookies()
    cy.visit('/')
  })

  /**
   * @description Test case for the full user registration and login flow.
   * It registers a new user via the UI and then logs in with the same credentials
   * to verify that the account was created successfully.
   */
  it('Register a new user and successfully login', () => {
    // ✅ Step 1: Intercept the login POST request to validate the response
    cy.intercept('POST', '**/login').as('login')

    // ✅ Step 2: Navigate to the login page and start registration
    UserActions.goToLogin()
    UserActions.goToEmailRegistration()

    // ✅ Step 3: Register a new user with generated details
    UserActions.register().then((user) => {
      // 📌 Log the generated user details for debugging
      // cy.log(`Registered User: ${JSON.stringify(user)}`)

      // ✅ Step 4: Perform login with the generated user credentials
      UserActions.login(user.email, user.password).then(() => {
        // ✅ Step 5: Verify the login response
        cy.get('@login')
          .its('response.body.authentication.umail')
          .should('eq', user.email)

        cy.get('@login').its('response.statusCode').should('eq', 200)

        // ✅ Step 6: Confirm that the user is redirected to the search page
        cy.url().should('include', '/#/search')
      })
    })
  })
})
