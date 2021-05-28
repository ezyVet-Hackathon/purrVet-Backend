import dotenv from 'dotenv'
import { startScrapper } from './src/utils/scrapper/googlePlaceIdResultScrapper'
import { main } from './src/utils/assigner/assigner'
dotenv.config()

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
// startScrapper(GOOGLE_API_KEY)
main()