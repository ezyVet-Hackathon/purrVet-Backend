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

export {
  clinicRoute
}