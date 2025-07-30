/* eslint-disable no-console */
/* eslint-disable no-magic-numbers */
import { run, open } from 'cypress'
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

// Set default environment if not specified
const envName = params.env || 'dev'

// Validate environment
if (!env[envName]) {
  throw new Error(`Environment "${envName}" is not defined in cypress.env.js.`)
}

// Combine environment-specific config with the top-level projectId
const envConfig = {
  ...env[envName],
  projectId: env.projectId,
}

// Generate the config object
const config = generateConfig(envConfig)

// Resolve the current directory using process.cwd()
const dir = process.cwd()

// Write the config to cypress.config.js
const configFilePath = path.resolve(dir, 'cypress.config.js')
fs.writeFileSync(
  configFilePath,
  `export default ${JSON.stringify(config, null, 2)}`,
)

// Add --record flag if in CI
if (process.env.CI === 'true') {
  args.push('--record')
  args.push(`--key=${process.env.CYPRESS_RECORD_KEY}`)
}

// Run or open Cypress based on the --open flag
const runParams = { ...params }
delete runParams.env

if (params.open) {
  const command = `npx cypress open ${args.join(' ')}`
  console.log(`Running: ${command}`)
  exec(command, (error, stdout, stderr) => {
    console.log(stdout)
    console.error(stderr)
  })
} else {
  const command = `npx cypress run ${args.join(' ')}`
  console.log(`Running: ${command}`)
  exec(command, (error, stdout, stderr) => {
    console.log(stdout)
    console.error(stderr)
  })
}
