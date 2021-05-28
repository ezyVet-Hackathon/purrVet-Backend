import dotenv from 'dotenv'
import { startScrapper } from './src/utils/scrapper/googlePlaceIdResultScrapper'
dotenv.config()

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
startScrapper(GOOGLE_API_KEY)