import mongoose from "mongoose"

const quoteCarouselSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    rating: { type: Number, required: true },
    fullname: { type: String, required: true },
    position: { type: String, required: true },
  },
  { timestamps: true },
)

const quoterSchema = mongoose.model("Quote", quoteCarouselSchema)

export default quoterSchema
