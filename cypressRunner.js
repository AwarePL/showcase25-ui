/**
 * @file Cypress runner script that executes Cypress tests with environment-specific configurations.
 * @description This script reads environment variables from `cypress.env.js` and runs Cypress in either headless or open mode.
 * It supports running tests in parallel across multiple containers for faster execution.
 *
 * @param {Object} options - The command-line options passed to the script.
 * @param {string} options.env - The environment to run tests against (dev, staging, prod).
 * @param {boolean} [options.open=false] - If true, opens Cypress GUI instead of running headless.
 * @example
 * // Run in dev environment headless
 * node cypressRunner.js --env dev
 *
 * @example
 * // Run in staging environment with GUI
 * node cypressRunner.js --env staging --open
 */

/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */

import fs from 'fs'
import path from 'path'
import { env } from './cypress.env.js'
import generateConfig from './config/base.config.js'
import { exec } from 'child_process'

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

const envName = params.env || 'dev'

if (!env[envName]) {
  throw new Error(`Environment "${envName}" is not defined in cypress.env.js.`)
}

const envConfig = {
  ...env[envName],
  projectId: env.projectId,
}

const config = generateConfig(envConfig)
const dir = process.cwd()
const configFilePath = path.resolve(dir, 'cypress.config.js')
fs.writeFileSync(
  configFilePath,
  `export default ${JSON.stringify(config, null, 2)}`,
)

const cypressArgs = [...args]
const envIndex = cypressArgs.findIndex((arg) => arg === '--env')
if (envIndex > -1) {
  cypressArgs.splice(envIndex, 2)
}


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