/**
 * A utility that dynamically generates a series of `it()` blocks to verify
 * that a list of static elements is visible on a given page.
 *
 * @param {Array<{name: string, selector: string}>} elementsList - An array of objects, where each object represents an element to check.
 * @param {string} pageName - The name of the page being tested, used for generating descriptive test titles.
 * @example
 * const elements = [{ name: 'Login Button', selector: '#login' }];
 * generateTestsForStaticElements(elements, 'Login Page');
 */
export const generateTestsForStaticElements = (elementsList, pageName) => {
  // --- Input validation ---
  if (!Array.isArray(elementsList)) {
    throw new Error('elementsList must be an array')
  }
  if (typeof pageName !== 'string') {
    throw new Error('pageName must be a string')
  }
  // --- End of validation ---

  elementsList.forEach(({ name, selector }) => {
    // Validate that each element object has the required properties
    if (!name || !selector) {
      throw new Error('Each element must have a name and selector')
    }

    it(`should display ${name} on ${pageName}`, () => {
      cy.get(selector).should('be.visible')
    })
  })
}
