import mongoose from 'mongoose'

export const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      default: '',
      required: false,
    },
    password: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

export const User = mongoose.model('User', UserSchema)
