// @ts-check
import * as fs from 'node:fs'
import * as path from 'node:path'
import { exec as exec_ } from 'node:child_process'
import { promisify } from 'node:util'

const exec = promisify(exec_)

const API_PATH = 'api'
const WEB_PATH = 'web'

const main = async () => {
  if( fs.existsSync('.aeria') ) {
    if( fs.existsSync(path.join(API_PATH, '.aeria')) ) {
      for( const file of await fs.promises.readdir('.aeria') ) {
        await fs.promises.rename(path.join('.aeria', file), path.join(API_PATH, '.aeria', file))
      }
      await fs.promises.rm('.aeria', {
        recursive: true,
      })
    } else {
      await fs.promises.rename('.aeria', path.join(API_PATH, '.aeria'))
    }
  }

  if( fs.existsSync('.aeria-ui') ) {
    if( fs.existsSync(path.join(WEB_PATH, '.aeria-ui')) ) {
      for( const file of await fs.promises.readdir('.aeria-ui') ) {
        await fs.promises.rename(path.join('.aeria-ui', file), path.join(WEB_PATH, '.aeria-ui', file))
      }
      await fs.promises.rm('.aeria-ui', {
        recursive: true,
      })
    } else {
      await fs.promises.rename('.aeria-ui', path.join(WEB_PATH, '.aeria-ui'))
    }
  }

  const { workspaces } = JSON.parse(await fs.promises.readFile('package.json', {
    encoding: 'utf-8',
  }))

  for( const cwd of workspaces ) {
    await exec('npm i --package-lock-only --workspaces false', {
      cwd,
    })
  }
}

main()

