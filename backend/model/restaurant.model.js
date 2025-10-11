import { Schema, model } from 'mongoose'
import { Address } from './address.model.js'
import mongooseErrorHandler from '../middleware/mongooseErrorHandler.js'
import { User } from './user.model.js'

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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      validate: {
        validator: async function (value) {
          const user = await User.findById(value)
          return user !== null
        },
        message: 'Validation failed: User ID does not exist',
      },
    },
    address: {
      type: Address.schema,
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

RestaurantSchema.index({ name: 1, 'address.street': 1 }, { unique: true })

const restaurantErrorHandler = mongooseErrorHandler(
  'A restaurant with this name already exists at this address'
)
RestaurantSchema.post('save', restaurantErrorHandler)

export const Restaurant = model('Restaurant', RestaurantSchema)
