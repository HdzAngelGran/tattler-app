import { Router } from 'express'
import restaurantRouter from './restaurant.js'
const mainRouter = Router()

mainRouter.use('/restaurant', restaurantRouter)

export default mainRouter
