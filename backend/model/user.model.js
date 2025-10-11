import mongoose from 'mongoose'
import mongooseErrorHandler from '../middleware/mongooseErrorHandler.js'

export const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      default: false,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
)

const userErrorHandler = mongooseErrorHandler(
  'A user with this email already exists'
)
UserSchema.post('save', userErrorHandler)

export const User = mongoose.model('User', UserSchema)
