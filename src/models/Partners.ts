import mongoose from "mongoose"

const PartnersSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },

  { timestamps: true },
)

const Partners = mongoose.model("Partners", PartnersSchema)
export default Partners
