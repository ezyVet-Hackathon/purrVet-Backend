import dotenv from 'dotenv'
dotenv.config()

/**
 * The default port for the server to run on.
 */
const port = process.env.PORT

/**
 * Connection string for MongoDB
 */
const MONGODB_URI = process.env.MONGODB_URI || ""

/**
 * Node environment
 */
const NODE_ENV = process.env.NODE_ENV || "development"

/**
 * Firebase Config File
 * JSON stringify and encoded in base 64
 */
const FIREBASE_SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT

/**
 * Google Places API Key
 */
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

/**
 * App name
 */
const APP_NAME = process.env.APP_NAME

export {
  port,
  MONGODB_URI,
  NODE_ENV,
  FIREBASE_SERVICE_ACCOUNT,
  GOOGLE_API_KEY,
  APP_NAME
}

export default {
  port,
  MONGODB_URI,
  NODE_ENV,
  FIREBASE_SERVICE_ACCOUNT,
  GOOGLE_API_KEY,
  APP_NAME
}