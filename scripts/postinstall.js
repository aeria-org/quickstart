// @ts-check
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

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
 * @param {string} workspace
 * @param {string[]} dependencies
*/
const updateDependency = async (workspace, dependencies) => {
  const proc = spawn('npm', ['install'].concat(dependencies), {
    cwd: workspace
  })

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

  await updateDependency('api', [
    'aeria',
    'aeria-build',
    'aeria-sdk'
  ])

  await updateDependency('web', [
    'aeria-ui',
    'aeria-ui-build',
    'aeria-app-layout',
    '@aeria-ui/i18n-en'
  ])
}

main()

