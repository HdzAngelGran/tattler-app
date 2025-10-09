import { Restaurant } from '../model/restaurant.model.js'

class RestaurantController {
  constructor() {
    this.model = Restaurant
  }

  getAll = async (req, res) => {
    try {
      const restaurants = await this.model.find()
      res.status(200).json(restaurants)
    } catch (error) {
      console.error('Error finding list:', error)
      res.status(500).send('Internal Server Error')
    }
  }

  add = async (req, res) => {
    const { body } = req
    try {
      const restaurant = await this.model.create(body)
      res.status(200).json({ message: restaurant })
    } catch (error) {
      console.error('Error finding list:', error)
      res.status(500).send('Internal Server Error')
    }
  }
}

export default RestaurantController
