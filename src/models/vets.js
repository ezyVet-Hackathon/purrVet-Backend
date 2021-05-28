import { vetMongoose } from '../instances'
import { Schema } from 'mongoose'

const vetsSchema = new Schema({
  placeId: {
    type: String,
    index: true,
  },
  name: {
    type: String,
    index: true
  },
  vicinity: String,
  location: {
    lat: {
      type: Schema.Types.Decimal128,
      index: true
    },
    lng: {
      type: Schema.Types.Decimal128,
      index: true
    }
  },
  googleResults: {
    rating: {
      type: Schema.Types.Decimal128,
      index: true
    },
    business_status: {
      type: Schema.Types.String,
      index: true
    },
    user_ratings_total: {
      type: Schema.Types.Number,
      index: true
    },
    website: String
  }
}, { timestamps: true, strict: false })

const Vets = vetMongoose.model("vets", vetsSchema)

export {
  Vets
}