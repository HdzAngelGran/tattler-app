import { Schema, model } from 'mongoose'
import { User } from './user.model.js'
import { Address } from './address.model.js'

export const RestaurantSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    description: {
      type: String,
      default: '',
      required: false,
    },
    cuisine: {
      type: String,
      required: [true, 'Cuisine is required'],
    },
    priceRange: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Price range is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    address: {
      type: [Address.schema],
      required: [true, 'Address is required'],
    },
    image: {
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
