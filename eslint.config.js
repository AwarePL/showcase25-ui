import cypress from 'eslint-plugin-cypress'

export default {
  languageOptions: {
    globals: {
      browser: 'readonly',
      es2021: 'readonly',
    },
  },
  plugins: {
    cypress: cypress,
  },
  rules: {
    // Cypress-specific rules (only valid rules)
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/no-force': 'warn',

    // General code quality
    'no-console': 'warn',
    'no-unused-expressions': 'error',
    'prefer-const': 'error',
    'no-magic-numbers': ['error', { ignore: [0, 1, 2, 200, 401] }],

    // Style rules (aligned with Prettier)
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'prefer-template': 'error',
    'no-trailing-spaces': 'error',
  },
}
