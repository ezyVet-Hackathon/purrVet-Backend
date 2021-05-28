import { Vets } from '../../models'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
import Places from 'google-places-web'

const startScrapper = async (googleApiKey) => {
  try {
    // Setup Google API Key
    Places.apiKey = googleApiKey

    const vetData = await Vets.find().lean().select("placeId name").exec()

    const promise = vetData.map(async (c) => {
      const name = c.name
      const placeId = c.placeId

      const response = await Places.details({
        placeid: placeId
      })

      if (response.status === "OK") {
        await Vets.findOneAndUpdate({ _id: new ObjectId(c["_id"]) }, {
          googleResults: response.result
        }).select("").lean().exec()
      } else {
        console.log("Failed", name, response)
      }
    })

    await Promise.all(promise)
    process.exit(0)
  } catch (err) {
    console.error("error startScrapper", err)
  }
}

export {
  startScrapper
}