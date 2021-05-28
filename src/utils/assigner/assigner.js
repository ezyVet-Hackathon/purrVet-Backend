import { Mappers, Vets } from '../../models'

// Constants
const KEYS = [
  "languages",
  "price",
  "animals",
  "clinicType"
]

const LANGUAGES = [
  "Maori",
  "Samoan",
  "Mandarin",
  "Cantonese",
  "Hindi",
  "Vietnamese",
  "Arabic",
  "French"
]

const PRICE = [
  "10-50",
  "50-100",
  "100-500",
  "500-1000",
  "1000-5000",
  "5000+"
]

const ANIMALS = [
  "dog",
  "cat",
  "pig",
  "chicken",

]

const CLINIC_TYPE = [
  "Emergency",
  "GP",
  "Mixed Practice",
  "Specialty",
  "Equine",
  "Large Animal"
]

const all = async () => {
  try {
    // Construct combined array
    const keys = []
    for (const key of KEYS) {
      for (const language of LANGUAGES) {
        keys.push({
          key: key,
          secondaryKey: language
        })
      }
    }
    console.log("keys", keys)
  } catch (err) {
    console.error("error assignLanguage", err)
  }
}

// Assign language
const assignLanguage = async () => {
  try {
    // Construct combined array
    const keys = []
    for (const language of LANGUAGES) {
      keys.push({
        key: "languages",
        secondaryKey: language
      })
    }
    console.log("keys", keys)

    const promise = keys.map(async (c) => {
      await Mappers.findOneAndUpdate(
        {
          key: c.key,
          secondaryKey: c.secondaryKey
        },
        {
          value: []
        },
        {
          upsert: true
        }
      ).select().lean().exec()
    })

    await Promise.all(promise)
  } catch (err) {
    console.error("error assignLanguage", err)
  }
}

// Assign price
const assignPrice = async () => {

}

// Assign animal
const assignAnimal = async () => {

}

const main = async () => {
  await assignLanguage()

  process.exit(0)
}

export {
  main
}