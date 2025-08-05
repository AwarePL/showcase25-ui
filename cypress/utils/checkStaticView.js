/**
 * Generates Cypress tests to verify static elements are visible on a page
 * @param {Array} elementsList - Array of objects with name and selector properties
 * @param {string} pageName - Name of the page being tested
 */
export const generateTestsForStaticElements = (elementsList, pageName) => {
  // Input validation
  if (!Array.isArray(elementsList)) {
    throw new Error('elementsList must be an array')
  }

  if (typeof pageName !== 'string') {
    throw new Error('pageName must be a string')
  }

  elementsList.forEach(({ name, selector }) => {
    // Validate each element has required properties
    if (!name || !selector) {
      throw new Error('Each element must have a name and selector')
    }

    it(`Should display ${name} on ${pageName}`, () => {
      cy.get(selector).should('be.visible')
    })
  })
}
