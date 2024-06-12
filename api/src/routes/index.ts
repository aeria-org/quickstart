import { createRouter, Result } from 'aeria'

export const router = createRouter()

router.GET('/test', async (context) => {
  const { error, result } = await context.collections.person.functions.get({
    filters: {},
  })

  if( error ) {
    return Result.error(error)
  }

  return {
    message: 'Hello, world!',
    result,
  }
})

