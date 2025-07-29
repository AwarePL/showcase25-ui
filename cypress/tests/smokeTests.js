import { UserActions } from '../steps/UserActions'

describe('Smoke Tests for Juice Shop', () => {
  const username = 'admin'
  const password = 'owaspbwa'

  it('Should login successfully', () => {
    // Arrange
    UserActions.login(username, password)

    // Assert
    cy.url().should('include', '/#/dashboard')
    cy.contains('Welcome, admin').should('be.visible')
  })

  it('Should show error for invalid credentials', () => {
    // Arrange
    UserActions.login('wronguser', 'wrongpass')

    // Assert
    cy.get('.alert-danger').should('contain', 'Invalid credentials')
  })
})
