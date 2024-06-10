// @ts-check
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const LOCK_FILENAME = 'create-aeria-app.lock'

/**
 * @param {string} workspace
 * @param {string} origin
*/
const moveFolder = async (workspace, origin) => {
  const target = path.join(workspace, origin)

  if( fs.existsSync(origin) ) {
    if( !fs.existsSync(target) ) {
      await fs.promises.rename(
        origin,
        path.join(workspace, origin)
      )
    } else {
      const files = await fs.promises.readdir(origin)
      for( const file of files ) {
        await fs.promises.rename(
          path.join(origin, file),
          path.join(target, file),
        )
      }

      await fs.promises.rmdir(origin)
    }
  }
}

/**
 * @param {string | null} workspace
 * @param {string[]} dependencies
*/
const updateDependency = async (workspace, dependencies) => {
  const proc = spawn(
    'npm',
    ['install', '--force'].concat(
      workspace
        ? ['-w', workspace]
        : [],
      dependencies.map((dep) => `${dep}@latest`)
    ),
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
  await moveFolder('api', '.aeria')
  await moveFolder('web', '.aeria-ui')

  if( !fs.existsSync(LOCK_FILENAME) ) {
    await updateDependency(null, [
      'dualist',
      'eslint-config-aeria',
    ])

    await updateDependency('api', [
      'aeria',
      'aeria-sdk',
    ])

    await updateDependency('web', [
      '@aeria-ui/i18n-en',
      'aeria-app-layout',
      'aeria-ui',
      'eslint-config-aeriaui',
    ])

    await fs.promises.writeFile(LOCK_FILENAME, '')
  }

  await fs.promises.copyFile('package-lock.json', 'api/package-lock.json')
  await fs.promises.copyFile('package-lock.json', 'web/package-lock.json')
}

main()

