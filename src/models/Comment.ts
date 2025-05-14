import mongoose from "mongoose"
import { string } from "zod"

const commentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "comment", required: true },
    name: {
      type: string,
      required: true,
    },
    email: {
      type: string,
    },
    content: { type: string, required: true },
  },
  { timestamps: true },
)

commentSchema.index({ blogId: 1, createdAt: -1 })
commentSchema.index({ parentId: 1 })

const Comment = mongoose.model("comment", commentSchema)

export default Comment
