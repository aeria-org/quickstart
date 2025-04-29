// @ts-check
import * as fs from 'node:fs'
import * as path from 'node:path'
import { exec as exec_ } from 'node:child_process'
import { promisify } from 'node:util'

const exec = promisify(exec_)

const main = async () => {
  if( fs.existsSync('.aeria') ) {
    if( fs.existsSync(path.join('api', '.aeria')) ) {
      for( const file of await fs.promises.readdir('.aeria') ) {
        await fs.promises.rename(path.join('.aeria', file), path.join('api', '.aeria', file))
      }
      await fs.promises.rm('.aeria', {
        recursive: true,
      })
    } else {
      await fs.promises.rename('.aeria', path.join('api', '.aeria'))
    }
  }

  if( fs.existsSync('.aeria-ui') ) {
    if( fs.existsSync(path.join('web', '.aeria-ui')) ) {
      for( const file of await fs.promises.readdir('.aeria-ui') ) {
        await fs.promises.rename(path.join('.aeria-ui', file), path.join('web', '.aeria-ui', file))
      }
      await fs.promises.rm('.aeria-ui', {
        recursive: true,
      })
    } else {
      await fs.promises.rename('.aeria-ui', path.join('web', '.aeria-ui'))
    }
  }

  for( const cwd of ['api', 'web'] ) {
    await exec('npm i --package-lock-only --workspaces false', {
      cwd,
    })
  }
}

main()

