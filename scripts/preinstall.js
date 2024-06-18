// @ts-check
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const LOCK_FILENAME = 'create-aeria-app.lock'

/**
 * @param {string | null} workspace
 * @param {string} cmd
*/
const command = async (workspace, cmd) => {
  const [bin, ...args] = cmd.split(' ')
  const proc = spawn(
    bin,
    args,
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

  return promise
}

/**
 * @param {string | null} workspace
 * @param {string[]} dependencies
*/
const updateDependencies = async (workspace, dependencies) => {
  return command(workspace, [
    'npm',
    'install',
    '--force',
    dependencies.map((dep) => `${dep}@latest`)
  ].flat().join(' '))
}

const main = async () => {
  if( !fs.existsSync(LOCK_FILENAME) ) {
    await updateDependencies(null, [
      'dualist',
      'eslint-config-aeria',
    ])

    await updateDependencies('api', [
      'aeria',
      'aeria-sdk',
    ])

    await updateDependencies('web', [
      '@aeria-ui/i18n-en',
      'aeria-app-layout',
      'aeria-ui',
      'eslint-config-aeriaui',
    ])

    await fs.promises.writeFile(LOCK_FILENAME, '')
    return
  }

  await command('api', 'npm install')
  await command('web', 'npm install')
}

main()

