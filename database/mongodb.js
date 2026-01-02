import mongoose from 'mongoose'
import { DB_URI, NODE_ENV } from '../config/env.js'
if (!DB_URI) {
  throw new Error(
    'please define DB_URI variable in .env.<development/production>.local'
  )
}
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI) // 1:06:24
    console.log(`connect to database in ${NODE_ENV} mode`)
  } catch (error) {
    console.error('Error connecting to database: ', error)
    process.exit(1)
  }
}
export default connectToDatabase
