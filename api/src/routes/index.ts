import { createRouter } from 'aeria'
import { pizzaRoutes } from '../collections/pizza/routes.js'

export const router = createRouter()
router.group('/pizza', pizzaRoutes)
