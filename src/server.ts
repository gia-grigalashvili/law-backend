import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./router/auth"
import carouselRoutes from "./router/carousel"
import bunnerRoutes from "./router/banners"
import partnersRoutes from "./router/Partners"
import quoteRoutes from "./router/quoteCarousel"
import contactRoutes from "./router/contact"
import faqRoutes from "./router/faq"
import blogRoutes from "./router/blog"
import categoryRoutes from "./router/category"
import tagRoutes from "./router/Tags"
import businessRoutes from "./router/business"
import practiceRoutes from "./router/practice"
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
app.use("/api/contact", contactRoutes)
app.use("/api/faq", faqRoutes)
app.use("/api/practice", practiceRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/tags", tagRoutes)
app.use("/api/business", businessRoutes)
export default app
