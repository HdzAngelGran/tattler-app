import { Schema, model } from 'mongoose'
import { User } from './user.model'
import { Review } from './review.model'
import { Address } from './address.model'

export const RestaurantSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    cuisine: {
      type: String,
      required: [true, 'Cuisine is required'],
    },
    priceRange: {
      type: String,
      required: [true, 'Price range is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    reviews: {
      type: [Review.schema],
      default: [],
      required: false,
    },
    createdBy: {
      type: [User.schema],
      required: [true, 'User is required'],
    },
    address: {
      type: [Address.schema],
      required: [true, 'Address is required'],
    },
    Image: {
      type: String,
      get: (v) => `${process.env.FRONT_URL}${v}`,
      required: [true, 'Image is required'],
    },
  },
  {
    timestamps: true,
  }
)

export const Restaurant = model('Restaurant', RestaurantSchema)
