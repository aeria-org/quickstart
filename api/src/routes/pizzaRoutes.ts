import { createRouter } from 'aeria'

export const pizzaRoutes = createRouter()

pizzaRoutes.GET('/topRatedPizzas', (context) => {
  return context.collections.pizza.functions.getAll({
    limit: 5,
    sort: {
      rating: -1,
    },
  })
})

pizzaRoutes.POST('/shampoo123', (context) => {
  return [
    {
      name: context.request.payload.name,
      now: new Date(),
      age: 24,
    },
  ]
  // return context.collections.pizza.functions.getAll({
  //   limit: 5,
  //   sort: {
  //     rating: -1,
  //   },
  // })
}, {
  payload: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      type: {
        enum: [
          'dog',
          'alien',
          'human',
        ],
      },
    },
  },
  response: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
        },
        now: {
          type: 'string',
          format: 'date-time',
        },
      },
    },
  },
})

