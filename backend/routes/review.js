import { Router } from 'express'
import ReviewController from '../controller/review.js'

const reviewRouter = Router({ mergeParams: true })

const reviewController = new ReviewController()

reviewRouter.get('/', reviewController.getAll)
reviewRouter.post('/', reviewController.add)

export default reviewRouter
