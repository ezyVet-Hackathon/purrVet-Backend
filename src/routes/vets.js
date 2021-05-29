import { Router } from 'express'
import { Vets, Profiles } from '../models'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

const vetRoute = Router()

vetRoute.route("/vets")
  .get(async (req, res) => {
    try {
      const vetsClinicId = req.query.id

      const result = await Vets.findOne({
        _id: new ObjectId(vetsClinicId)
      }).lean().exec()

      const vetsProfile = await Profiles.find({
        worksAt: result?.placeId
      }).lean().exec()

      const returnObj = {
        ...result,
        vets: vetsProfile
      }

      return res.status(200).send(returnObj)
    } catch (err) {
      console.error("GET /vets error", err)
      return res.status(500).send(err)
    }
  })
  .post(async (req, res) => {
  })

export {
  vetRoute
}