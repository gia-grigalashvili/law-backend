
import mongoose from "mongoose"

const connectD = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL!)
    console.log("✅ Connected to MongoDB")
  } catch (err) {
    console.error("❌ MongoDB connection error:", err)
    throw err
  }
}

export default connectD
