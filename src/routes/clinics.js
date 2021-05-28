import { Router } from 'express'
import { Vets } from '../models'

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

      const result = await Vets.find(queryObj).select("name location vicinity").lean().exec()

      return res.status(200).send(result)
    } catch (err) {
      console.error("POST /clinic-search error", err)
      return res.status(500).send(err)
    }
  })

export {
  clinicRoute
}