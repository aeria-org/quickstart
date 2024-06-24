export * from '../.aeria/out/collections/index.mjs'
export { user, file, tempFile } from 'aeria'
import { extendPersonCollection } from '../.aeria/out/index.mjs'

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

