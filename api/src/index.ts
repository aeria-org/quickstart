import { init } from 'aeria'
import { router } from './router.js'
export * as collections from './collections.js'

export default init({
  router,
  config: {
    baseUrl: '/api',
    publicUrl: process.env.API_URL,
    webPublicUrl: process.env.WEB_PUBLIC_URL,
    secret: process.env.APPLICATION_SECRET,
    security: {
      rolesHierarchy: {
        root: true,
      },
    },
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
})

