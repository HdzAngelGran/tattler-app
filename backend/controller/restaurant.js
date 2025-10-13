import mongoose from 'mongoose'
import TattlerError from '../middleware/tattlerError.js'
import { Restaurant } from '../model/restaurant.model.js'
class RestaurantController {
  constructor() {
    this.model = Restaurant
  }

  getAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const size = parseInt(req.query.size) || 10
    const startIndex = (page - 1) * size

    const { name, cuisine, priceRange, rate } = req.query
    const filter = {}

    if (name) {
      filter.name = { $regex: name, $options: 'i' }
    }

    if (cuisine) {
      filter.cuisine = cuisine
    }

    if (priceRange) {
      filter.priceRange = parseInt(priceRange)
    }

    const aggregation = [
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'restaurant',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
        },
      },
      {
        $match: filter,
      },
    ]

    if (rate) {
      aggregation.push({
        $match: { averageRating: { $gte: parseInt(rate) } },
      })
    }

    const total = (await this.model.aggregate(aggregation)).length
    const restaurants = await this.model
      .aggregate(aggregation)
      .skip(startIndex)
      .limit(size)

    const pagination = {
      total,
      size,
      currentPage: page,
      totalPages: Math.ceil(total / size),
    }

    res.status(200).json({ restaurants, pagination })
  }

  add = async (req, res) => {
    const { body } = req
    const restaurant = await this.model.create(body)
    res.status(200).json({ message: restaurant })
  }

  getById = async (req, res) => {
    const { id } = req.params

    const restaurant = await this.model.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'restaurant',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
        },
      },
    ])

    if (!restaurant.length) {
      throw new TattlerError(404, 'Restaurant not found')
    }

    res.status(200).json(restaurant[0])
  }
}

export default RestaurantController
