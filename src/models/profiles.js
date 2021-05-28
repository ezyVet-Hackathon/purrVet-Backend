import { vetMongoose } from '../instances'
import { Schema } from 'mongoose'

const profileSchema = new Schema({
  worksAt: {
    type: String,
    index: true,
  },
  gender: {
    type: String,
    index: true
  },
  email: String,
  dob: Schema.Types.Mixed,
  registered: Schema.Types.Mixed,
  picture: String,
}, { timestamps: true, strict: false })

const Profiles = vetMongoose.model("profiles", profileSchema)

export {
  Profiles
}