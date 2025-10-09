import { Router } from 'express'
import RestaurantController from '../controller/restaurant.js'
import reviewRouter from './review.js'

const restaurantRouter = Router({ mergeParams: true })

const restaurantController = new RestaurantController()

restaurantRouter.use('/:restaurantId/review', reviewRouter)

restaurantRouter.get('/', restaurantController.getAll)
restaurantRouter.post('/', restaurantController.add)

export default restaurantRouter
