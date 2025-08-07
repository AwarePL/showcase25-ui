/* eslint-disable no-magic-numbers */
import { faker } from '@faker-js/faker'

Cypress.Commands.add(
  'generateUserDetailsFixture',
  { prevSubject: false },
  () => {
    // Generate user data with updated password and email logic
    const user = {
      email: faker.internet.email({ length: 20 }),
      password: faker.internet.password({
        length: 12,
      }),
      favoritePet: faker.animal.dog(),
    }

    // Create a timestamp for the filename
    const timestamp = new Date().toISOString().replace(/[:.\s]/g, '-')
    const filename = `generatedTestUser_${timestamp}.json`

    // Save the user to a generated folder
    const filePath = `cypress/fixtures/generated/${filename}`
    cy.writeFile(filePath, user).then(() => {
      // Return the user object for use in tests
      return user
    })
  },
)

Cypress.Commands.add('setDismissCookies', { prevSubject: false }, () => {
  cy.setCookie('cookieconsent_status', 'dismiss')
  cy.setCookie('welcomebanner_status', 'dismiss')
})

Cypress.Commands.add('registerUserViaApi', () => {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12, prefix: 'aA1!' }),
    securityAnswer: faker.animal.cat(),
  }

  cy.request({
    method: 'POST',
    url: '/api/Users/',
    body: {
      email: user.email,
      password: user.password,
      passwordRepeat: user.password,
      securityQuestion: {
        id: 7,
        question: 'Name of your favorite pet?',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      securityAnswer: user.securityAnswer,
    },
  }).then((response) => {
    expect(response.status).to.eq(201)

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `generatedTestUser_${timestamp}.json`
    const filePath = `cypress/fixtures/generated/${filename}`

    cy.writeFile(filePath, {
      email: user.email,
      password: user.password,
    })

    return cy.wrap(user)
  })
})
