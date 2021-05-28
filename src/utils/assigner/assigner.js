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

const assignerRefactorFunc = async (vets, array, key, min, max = null) => {
  try {
    // Construct combined array
    const valueObj = {}
    const objectIdObj = {}
    for (const value of array) {
      valueObj[value] = []
    }

    let valueRange = array.length - 1
    if (max !== null) {
      valueRange = max
    }

    for (const vet of vets) {
      // Randomly assign a value for this vet
      objectIdObj[vet] = []
      const numOfRounds = getRandom(min, valueRange)
      for (const loop of new Array(numOfRounds).fill(true)) {
        // Get a language to assign
        const rng = getRandom(0, valueRange)
        const selectedValue = array[rng]
        valueObj[selectedValue] = [
          ...valueObj[selectedValue],
          vet
        ]

        objectIdObj[vet] = [
          ...objectIdObj[vet],
          selectedValue
        ]
      }
    }

    // Need to update the selected values in Vets and also the mapper

    // Update value database
    const promise = Object.entries(valueObj).map(async ([valueKey, objectIds]) => {
      const cleanedArray = removeDuplicate(objectIds)
      await Mappers.findOneAndUpdate(
        {
          key: key,
          secondaryKey: valueKey
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
    const promiseVets = Object.entries(objectIdObj).map(async ([objectId, value]) => {
      const cleanedArray = removeDuplicate(value)
      await Vets.findOneAndUpdate({
        _id: new ObjectId(objectId)
      }, {
        [key]: cleanedArray
      }).select().lean().exec()
    })

    await Promise.all(promiseVets)

  } catch (err) {
    console.error("error assignerRefactorFunc", err)
  }
}

// Assign language
const assignLanguage = async (vets) => {
  try {
    await assignerRefactorFunc(vets, LANGUAGES, "languages", 2, null)
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