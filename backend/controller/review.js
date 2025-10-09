import { Review } from '../model/review.model.js'

class ReviewController {
  constructor() {
    this.model = Review
  }

  getAll = async (req, res) => {
    const { restaurantId } = req.query
    try {
      const reviews = await this.model.find({ restaurant: restaurantId })
      res.status(200).json(reviews)
    } catch (error) {
      console.error('Error finding list:', error)
      res.status(500).send('Internal Server Error')
    }
  }

  add = async (req, res) => {
    const { restaurantId } = req.params
    const { body } = req
    try {
      body.restaurant = restaurantId
      await this.model.create(body)
      res.status(200).send('Review posted successfully!')
    } catch (error) {
      console.error('Error adding comment:', error)
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((val) => val.message)
        return res.status(400).json({
          message: 'Missing required fields.',
          errors: messages,
        })
      }
      if (error.code === 11000) {
        return res.status(409).json({
          message:
            'This email has already submitted a review for this restaurant.',
        })
      }
      res.status(500).send('Internal Server Error')
    }
  }
}

export default ReviewController
