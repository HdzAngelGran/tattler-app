import { Router } from 'express'
import ReviewController from '../controller/review.js'
import protect from '../middleware/authHandler.js'

const reviewRouter = Router({ mergeParams: true })

const reviewController = new ReviewController()

reviewRouter.get('/', reviewController.getAll)
reviewRouter.post('/', protect, reviewController.add)

export default reviewRouter
