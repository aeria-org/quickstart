import { defineCollectionMiddleware } from 'aeria'

export const multitenancy = defineCollectionMiddleware({
  beforeRead: (payload, context, next) => {
    console.log('wooow!')
    console.log(payload)
    return next(payload, context)
  }
})

