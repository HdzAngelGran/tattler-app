import { Review } from '../model/review.model.js'

class ReviewController {
  constructor() {
    this.model = Review
  }

  getAll = async (req, res) => {
    const { restaurantId } = req.query
    const reviews = await this.model.find({ restaurant: restaurantId })
    res.status(200).json(reviews)
  }

  add = async (req, res) => {
    const { restaurantId } = req.params
    const { body } = req

    body.restaurant = restaurantId
    await this.model.create(body)
    res.status(200).send('Review posted successfully!')
  }
}

export default ReviewController
