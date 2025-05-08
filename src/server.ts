import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./router/auth"
import carouselRoutes from "./router/carousel"
import bunnerRoutes from "./router/banners"
import partnersRoutes from "./router/Partners"
import quoteRoutes from "./router/quoteCarousel"
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRoutes)
app.use("/api/carousel", carouselRoutes)
app.use("/api/bunner", bunnerRoutes)
app.use("/api/partners", partnersRoutes)
app.use("/api/quotes", quoteRoutes)
export default app
