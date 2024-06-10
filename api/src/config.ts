import type { InitApiConfig } from 'aeria'

export const config: InitApiConfig = {
  baseUrl: '/api',
  publicUrl: process.env.API_URL,
  secret: process.env.APPLICATION_SECRET,
  security: {
    exposeFunctionsByDefault: true,
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
}

