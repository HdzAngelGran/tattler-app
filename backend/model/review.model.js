import { Schema, model } from 'mongoose'

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
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Restaurant is required'],
    },
  },
  {
    timestamps: true,
  }
)

ReviewSchema.index({ restaurant: 1, email: 1 }, { unique: true })

export const Review = model('Review', ReviewSchema)
