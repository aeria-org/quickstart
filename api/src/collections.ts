export * from '../.aeria/out/collections/index.mjs'
import { extendPersonCollection } from '../.aeria/out/collections/index.mjs'

export const person = extendPersonCollection({
  description: {
    properties: {
      treatment: {
        getter: (doc) => {
          return `sr ${doc.name.split(' ')[0]}`
        },
      },
    },
  },
})

