/* eslint-disable no-magic-numbers */
import { run, open } from 'cypress' // <-- Import 'open' function
import fs from 'fs'
import path from 'path'
import { env } from './cypress.env.js'
import generateConfig from './config/base.config.js'

// Parse command line arguments
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

// Set default environment if not specified
const envName = params.env || 'dev'

// Validate environment
if (!env[envName]) {
  throw new Error(`Environment "${envName}" is not defined in cypress.env.js.`)
}

// Generate the config object
const config = generateConfig(env[envName])

// Resolve the current directory using process.cwd()
const dir = process.cwd()

// Write the config to cypress.config.js
const configFilePath = path.resolve(dir, 'cypress.config.js')
fs.writeFileSync(
  configFilePath,
  `export default ${JSON.stringify(config, null, 2)}`,
)

// Run or open Cypress based on the --open flag
const runParams = { ...params }
delete runParams.env // Remove 'env' as it's not a valid parameter for 'run' or 'open'

if (params.open) {
  open(config, runParams)
} else {
  run(config, runParams)
}
