import { model, Schema } from 'mongoose'

export const CoordinatesSchema = Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: [true, 'Coordinates are required'],
  },
})

export const Coordinates = model('Coordinates', CoordinatesSchema)
