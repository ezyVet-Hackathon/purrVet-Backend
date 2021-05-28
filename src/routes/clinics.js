import { Router } from 'express'
import { Mappers, Vets } from '../models'

const clinicRoute = Router()

clinicRoute.route("/clinic")
  .get(async (req, res) => {
    try {
      const result = await Vets.find().select("name location vicinity").lean().exec()

      return res.status(200).send(result)
    } catch (err) {
      console.error("GET clinicRoute error", err)
      return res.status(500).send(err)
    }
  })
  .post(async (req, res) => {
  })

clinicRoute.route("/clinic-search")
  .post(async (req, res) => {
    try {
      const locationBound = req.body.bounds
      const searchTerm = req.body.searchTerm
      const languageOptions = req.body.languageOptions

      let queryObj = {}
      
      /**
       * Search by:
       * - Location boundary (Passed in to POST)
       * - Languages 
       * - Price Range
       * - Animal
       * - Rating (Google Map data already exist)
       */

      if (locationBound) {
        queryObj["location.lat"] = { $gte: locationBound.latStart, $lte: locationBound.latEnd }
        queryObj["location.lng"] = { $gte: locationBound.lngStart, $lte: locationBound.lngEnd }
      }

      if (searchTerm != null && String(searchTerm).trim() !== "") {
        queryObj["name"] = { $regex: searchTerm, $options: "i" }
      }

      const objectIdMap = {}

      // Filtering down with ObjectID results
      const languageOptionsTest = ["Mandarin", "English"]
      const languageSearch = languageOptionsTest
      if (languageOptionsTest || languageOptions) {
        const objectIdsResult = languageSearch.map(async (c) => {
          const doc = await Mappers.findOne({
            key: "languages",
            secondaryKey: c
          }).select("value").lean().exec()

          return doc?.value ?? []
        })

        const objectIdsArray = await Promise.all(objectIdsResult)

        for (const parentArray of objectIdsArray) {
          for (const searchObjectId of parentArray) {
            if (objectIdMap[searchObjectId] === undefined) {
              objectIdMap[searchObjectId] = true
            }
          }
        }
      }

      const result = await Vets.find(queryObj).select("name location vicinity").lean().exec()

      const filteredSearch = result.filter((c) => {
        if (objectIdMap[c["_id"]]) {
          return true
        }
        return false
      })

      return res.status(200).send(filteredSearch)
    } catch (err) {
      console.error("POST /clinic-search error", err)
      return res.status(500).send(err)
    }
  })

export {
  clinicRoute
}