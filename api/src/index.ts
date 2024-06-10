import { init } from 'aeria'
import { config } from './config.js'
import { router } from './routes/index.js'
export * as collections from './collections.js'

export {
  router,
}

export default init({
  config,
  callback: (context) => {
    return router.install(context)
  },
})

