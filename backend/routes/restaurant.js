import { Router } from 'express'
import RestaurantController from '../controller/restaurant.js'

const restaurantRouter = Router()

const restaurantController = new RestaurantController()

restaurantRouter.get('/', restaurantController.getAll)
restaurantRouter.post('/', restaurantController.add)

export default restaurantRouter
