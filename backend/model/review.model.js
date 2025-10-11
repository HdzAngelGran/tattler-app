import { Schema, model } from 'mongoose'
import mongooseErrorHandler from '../middleware/mongooseErrorHandler.js'
import { User } from './user.model.js'
import { Restaurant } from './restaurant.model.js'

export const ReviewSchema = Schema(
  {
    rating: {
      type: Number,
      min: [1, 'Minimum value for rating is 1'],
      max: [5, 'Maximum value for rating is 5'],
      required: [true, 'Rating is required'],
    },
    comment: {
      type: String,
      default: '',
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      validate: {
        validator: async (value) => {
          const user = await User.findById(value)
          return user !== null
        },
        message: 'Validation failed: User ID does not exist',
      },
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Restaurant is required'],
      validate: {
        validator: async (value) => {
          const restaurant = await Restaurant.findById(value)
          return restaurant !== null
        },
        message: 'Validation failed: Restaurant ID does not exist',
      },
    },
  },
  {
    timestamps: true,
  }
)

ReviewSchema.index({ restaurant: 1, createdBy: 1 }, { unique: true })
const reviewErrorHandler = mongooseErrorHandler(
  'This email has already submitted a review for this restaurant'
)
ReviewSchema.post('save', reviewErrorHandler)

export const Review = model('Review', ReviewSchema)
