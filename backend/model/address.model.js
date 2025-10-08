import { Schema, model } from 'mongoose'

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
  zip: {
    type: Number,
    required: [true, 'Zip is required'],
  },
  coord: {
    type: [Number],
    default: [],
    required: [true, 'Coordinates are required'],
  },
  building: {
    type: String,
    required: [true, 'Building is required'],
  },
})

export const Address = model('Address', AddressSchema)
