import { Mappers, Vets } from '../../models'
import randomInt from 'random-int'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

const getRandom = (min, max) => {
  return randomInt(min, max)
}

const removeDuplicate = (array) => {
  const check = {}
  for (const a of array) {
    check[a] = true
  }

  const newArr = []
  for (const [key, value] of Object.entries(check)) {
    newArr.push(key)
  }
  return newArr
}

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
const assignLanguage = async (vets) => {
  try {
    // Construct combined array

    const languageObj = {}
    const objectIdObj = {}
    const keys = []
    for (const language of LANGUAGES) {
      // keys.push({
      //   key: "languages",
      //   secondaryKey: language
      // })
      languageObj[language] = []
    }

    const valueRange = LANGUAGES.length - 1
    const min = 2
    for (const vet of vets) {
      // Randomly assign a value for this vet
      objectIdObj[vet] = []
      const numOfRounds = getRandom(min, valueRange)
      for (const loop of new Array(numOfRounds).fill(true)) {
        // Get a language to assign
        const rng = getRandom(0, valueRange)
        const selectedValue = LANGUAGES[rng]
        languageObj[selectedValue] = [
          ...languageObj[selectedValue],
          vet
        ]

        objectIdObj[vet] = [
          ...objectIdObj[vet],
          selectedValue
        ]
      }
    }

    // Need to update the selected values in Vets and also the mapper

    // Update language database
    const promise = Object.entries(languageObj).map(async ([language, objectIds]) => {
      const cleanedArray = removeDuplicate(objectIds)
      await Mappers.findOneAndUpdate(
        {
          key: "languages",
          secondaryKey: language
        },
        {
          value: cleanedArray
        },
        {
          upsert: true
        }
      ).select().lean().exec()
    })

    await Promise.all(promise)

    // Update Vets with the language they can support
    const promiseVets = Object.entries(objectIdObj).map(async ([objectId, language]) => {
      const cleanedArray = removeDuplicate(language)
      await Vets.findOneAndUpdate({
        _id: new ObjectId(objectId)
      }, {
        languages: cleanedArray
      }).select().lean().exec()
    })

    await Promise.all(promiseVets)

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
  try {
    const vets = await Vets.find().select().lean().exec()
    const vetsObjectId = vets.map((c) => c["_id"])
    await assignLanguage(vetsObjectId)

  } catch (err) {
    console.error("error main", err)
  }

  process.exit(0)
}

export {
  main
}