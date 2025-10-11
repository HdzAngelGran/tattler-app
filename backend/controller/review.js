import TattlerError from '../middleware/tattlerError.js'
import { Restaurant } from '../model/restaurant.model.js'
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
    const restaurant = await Restaurant.findById(restaurantId)
    if (!restaurant) throw new TattlerError(404, 'Restaurant not found')
    if (restaurant.createdBy.toString() === body.createdBy)
      throw new TattlerError(400, 'You cannot review your own restaurant')
    await this.model.create(body)
    res.status(200).json({ message: 'Review posted successfully!' })
  }
}

export default ReviewController
