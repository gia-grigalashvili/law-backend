// index.js ან main.js
import dotenv from "dotenv"
dotenv.config()

import app from "./server"

import connectDB from "./config/db"

const PORT = process.env.PORT || 4000

const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
}

startServer()
