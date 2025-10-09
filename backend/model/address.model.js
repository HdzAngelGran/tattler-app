import { Schema, model } from 'mongoose'
import { Coordinates } from './coordinates.model.js'

export const AddressSchema = Schema({
  street: {
    type: String,
    required: [true, 'Street is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  state: {
    type: String,
    required: [true, 'State is required'],
  },
  zipCode: {
    type: String,
    required: [true, 'Zip code is required'],
  },
  coord: {
    type: [Coordinates.schema],
    required: [true, 'Coordinates are required'],
  },
  building: {
    type: String,
    required: [true, 'Building is required'],
  },
})

export const Address = model('Address', AddressSchema)
