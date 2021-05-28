import { vetMongoose } from '../instances'
import { Schema } from 'mongoose'

const mapperSchema = new Schema({
  key: {
    type: String,
    index: true
  },
  secondaryKey: {
    type: String,
    index: true
  },
  value: Schema.Types.Array
}, { timestamps: true, strict: false })

const Mappers = vetMongoose.model("mappers", mapperSchema)

export {
  Mappers
}