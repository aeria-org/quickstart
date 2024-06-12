// @ts-check
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const LOCK_FILENAME = 'create-aeria-app.lock'

/**
 * @param {string | null} workspace
 * @param {string[]} dependencies
 * @param {string | null=} tag
*/
const updateDependency = async (workspace, dependencies, tag) => {
  const proc = spawn(
    'npm',
    ['install', '--force'].concat(
      dependencies.map((dep) => tag ? `${dep}@${tag}` : dep)
    ),
    workspace
      ? { cwd: workspace }
      : {}
  )

  proc.stdout.pipe(process.stdout)
  proc.stderr.pipe(process.stderr)

  /** @type Promise<void> */
  const promise = new Promise((resolve) => {
    proc.on('close', () => {
      resolve()
    })
  })

  await promise
}

const main = async () => {
  const tag = fs.existsSync(LOCK_FILENAME)
    ? null
    : 'latest'

  await updateDependency(null, [
    'dualist',
    'eslint-config-aeria',
  ], tag)

  await updateDependency('api', [
    'aeria',
    'aeria-sdk',
  ], tag)

  await updateDependency('web', [
    '@aeria-ui/i18n-en',
    'aeria-app-layout',
    'aeria-ui',
    'eslint-config-aeriaui',
  ], tag)

  await fs.promises.writeFile(LOCK_FILENAME, '')
}

main()

