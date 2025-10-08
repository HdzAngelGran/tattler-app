import { Schema, model } from 'mongoose'

export const ReviewSchema = Schema(
  {
    rating: {
      type: String,
      required: [true, 'Rating is required'],
    },
    comment: {
      type: String,
      default: '',
      required: false,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
  },
  {
    timestamps: true,
  }
)

export const Review = model('Review', ReviewSchema)
