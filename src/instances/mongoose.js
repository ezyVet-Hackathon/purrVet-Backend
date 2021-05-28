import mongoose from 'mongoose'
import config from '../config'
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const vetMongoose = mongoose.createConnection(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
vetMongoose.once('open', function () {
  console.log("purrVet Finder MongoDB database connection established successfully")
})

export {
  vetMongoose
}