import { Router } from 'express'
import { Vets } from '../models'

const vetRoute = Router()

vetRoute.route("/vets")
  .get(async (req, res) => {
  })
  .post(async (req, res) => {
  })

export {
  vetRoute
}