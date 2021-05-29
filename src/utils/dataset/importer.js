import { Profiles, Vets } from '../../models'
import profiles from './profiles.json'
import vets from './vets.json'

const insertProfiles = async () => {
  try {
    const promise = profiles.map(async (c) => {
      const newProfile = new Profiles({
        worksAt: c.works_at,
        gender: c.gender,
        email: c.email,
        dob: c.dob,
        registered: c.registered,
        picture: c.picture,
        name: c.name
      })

      await newProfile.save()
    })

    await Promise.all(promise)
    console.log("Done with profiles")
  } catch (err) {
    console.error("err insertProfiles", err)
  }
}

const insertVets = async () => {
  try {
    const promise = vets.map(async (c) => {
      const newVets = new Vets({
        placeId: c.place_id,
        name: c.name,
        vicinity: c.vicinity,
        location: c.location
      })

      await newVets.save()
    })

    await Promise.all(promise)
    console.log("Done with vets")
  } catch (err) {
    console.error("err insertVets", err)
  }
}

// insertProfiles()
// insertVets()

export default insertProfiles