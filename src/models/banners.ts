import mongoose from "mongoose"


const bunerSchema = new mongoose.Schema(
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
    link1: {
      type: String,
    },
   
  },

  { timestamps: true },
)

const bunner = mongoose.model("bunner", bunerSchema)
export default bunner