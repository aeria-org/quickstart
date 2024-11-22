// @ts-check
import * as fs from 'fs'
import { exec as exec_ } from 'child_process'
import { promisify } from 'util'

const exec = promisify(exec_)
const LOCK_FILENAME = 'create-aeria-app.lock'

const main = async () => {
  if( !fs.existsSync(LOCK_FILENAME) ) {
    await exec('npm update dualist @eslint-aeria/config')
    await exec('npm update --workspace=api aeria aeria-sdk')
    await exec('npm update --workspace=web @aeria-ui/i18n-en aeria-app-layout aeria-ui aeria-sdk eslint-config-aeriaui')

    await fs.promises.writeFile(LOCK_FILENAME, '')
  }
}

main()

