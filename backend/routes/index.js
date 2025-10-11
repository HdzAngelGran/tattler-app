import { Router } from 'express'
import restaurantRouter from './restaurant.js'
import userRouter from './user.js'
const mainRouter = Router()

mainRouter.use('/restaurant', restaurantRouter)
mainRouter.use('/user', userRouter)

export default mainRouter
