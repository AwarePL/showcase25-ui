/**
 * @file cypressRunner.js
 * @description A wrapper script for running Cypress tests with dynamic configurations.
 * This script reads command-line arguments to select an environment (dev, staging, prod),
 * dynamically generates the `cypress.config.js` file, and then executes Cypress.
 * It also handles adding CI-specific flags when necessary.
 *
 * Usage examples:
 * `node cypressRunner.js --env dev` - Runs tests on the dev environment.
 * `node cypressRunner.js --env prod --open` - Opens the Cypress GUI for the prod environment.
 */

import fs from 'fs'
import path from 'path'
import { env } from './cypress.env.js'
import generateConfig from './config/base.config.js'
import { exec } from 'child_process'

// --- 1. Parse Command-Line Arguments ---
const args = process.argv.slice(2)
const params = {}
let i = 0
while (i < args.length) {
  if (args[i].startsWith('--')) {
    const key = args[i].substring(2)
    if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
      params[key] = args[i + 1]
      i += 2
    } else {
      params[key] = true
      i++
    }
  } else {
    i++
  }
}

// --- 2. Set Up Environment Configuration ---
// Default to 'dev' environment if --env flag is not provided
const envName = params.env || 'dev'

// Validate that the chosen environment exists in our config file
if (!env[envName]) {
  throw new Error(`Environment "${envName}" is not defined in cypress.env.js.`)
}

// Combine the base config with the specific environment config
const envConfig = {
  ...env[envName],
  projectId: env.projectId,
}

// --- 3. Dynamically Generate cypress.config.js ---
const config = generateConfig(envConfig)
const dir = process.cwd()
const configFilePath = path.resolve(dir, 'cypress.config.js')
fs.writeFileSync(
  configFilePath,
  `export default ${JSON.stringify(config, null, 2)}`,
)

// --- 4. Prepare Arguments for Cypress ---
// Filter out our custom --env argument, as Cypress doesn't understand it
const cypressArgs = [...args]
const envIndex = cypressArgs.findIndex((arg) => arg === '--env')
if (envIndex > -1) {
  cypressArgs.splice(envIndex, 2)
}

// Add the --record flag for Cypress Cloud if running in a CI environment
if (process.env.CI === 'true' && process.env.CYPRESS_RECORD_KEY) {
  const hasRecord =
    cypressArgs.includes('--record') || cypressArgs.includes('-r')
  if (!hasRecord) {
    cypressArgs.push('--record')
    cypressArgs.push(`--key=${process.env.CYPRESS_RECORD_KEY}`)
  }
}

// --- 5. Execute Cypress ---
// Run `cypress open` if --open flag is present, otherwise run `cypress run`
if (params.open) {
  const openArgs = cypressArgs.filter((arg) => arg !== '--open')
  const command = `npx cypress open ${openArgs.join(' ')}`
  console.log(`Running: ${command}`)
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`)
      process.exit(1)
    }
    console.log(stdout)
    console.error(stderr)
  })
} else {
  const command = `npx cypress run ${cypressArgs.join(' ')}`
  console.log(`Running: ${command}`)
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`)
      process.exit(1)
    }
    console.log(stdout)
    console.error(stderr)
  })
}
