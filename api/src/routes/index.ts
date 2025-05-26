import { createRouter, Result } from 'aeria'
import { contracts } from '../../.aeria/out/index.js'

export const router = createRouter()

router.GET('/user/getBySlug', async (context) => {
  const { error, result: user } = await context.collections.user.functions.get({
    filters: {
      _id: context.request.query.slug,
    },
  })

  if( error ) {
    return context.error(404, {
      code: 'RESOURCE_NOT_FOUND',
    })
  }

  return Result.result(user)

}, contracts.GetUserBySlug)

