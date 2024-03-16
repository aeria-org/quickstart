import { init } from 'aeria'
import { router } from './routes/index.js'
import * as collections from './collections/index.js'

export {
  collections,
  router,
}

export default init({
  config: {
    apiUrl: process.env.API_URL,
    secret: process.env.APPLICATION_SECRET,
    database: {
      mongodbUrl: process.env.MONGODB_URL,
    },
    defaultUser: {
      username: process.env.GODMODE_USERNAME,
      password: process.env.GODMODE_PASSWORD,
    },
    storage: {
      fs: process.env.STORAGE_PATH,
      tempFs: process.env.STORAGE_TEMP_PATH,
    },
  },
  callback: async (context) => {
    return router.install(context)
  },
})

