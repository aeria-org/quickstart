import { createRouter } from 'aeria'

export const router = createRouter()

router.GET('/test', () => {
  return {
    message: 'Hello, world!',
  }
})

