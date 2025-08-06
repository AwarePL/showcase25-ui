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

// Set default environment if not specified
const envName = params.env || 'dev'

// Validate environment
if (!env[envName]) {
  throw new Error(`Environment "${envName}" is not defined in cypress.env.js.`)
}

// Copy env, projectId and googleAccount to config
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

// ✅ POCZĄTEK ZMIAN: Filtrowanie argumentów
// Kopiujemy oryginalne argumenty
const cypressArgs = [...args]

// Znajdujemy indeks flagi --env
const envIndex = cypressArgs.findIndex((arg) => arg === '--env')

// Jeśli flaga --env istnieje, usuwamy ją oraz jej wartość (następny element w tablicy)
if (envIndex > -1) {
  cypressArgs.splice(envIndex, 2)
}
// ✅ KONIEC ZMIAN: Filtrowanie argumentów

// Add --record flag if in CI and record key exists
if (process.env.CI === 'true' && process.env.CYPRESS_RECORD_KEY) {
  // Only add record flags if not already present
  const hasRecord =
    cypressArgs.includes('--record') || cypressArgs.includes('-r')
  if (!hasRecord) {
    cypressArgs.push('--record')
    cypressArgs.push(`--key=${process.env.CYPRESS_RECORD_KEY}`)
  }
}

// Run or open Cypress based on the --open flag
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
  // For run mode, use the Cypress binary directly instead of yarn
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
