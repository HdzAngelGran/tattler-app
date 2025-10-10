import { Restaurant } from '../model/restaurant.model.js'

class RestaurantController {
  constructor() {
    this.model = Restaurant
  }

  getAll = async (req, res) => {
    const restaurants = await this.model.find()
    res.status(200).json(restaurants)
  }

  add = async (req, res) => {
    const { body } = req
    const restaurant = await this.model.create(body)
    res.status(200).json({ message: restaurant })
  }
}

export default RestaurantController
