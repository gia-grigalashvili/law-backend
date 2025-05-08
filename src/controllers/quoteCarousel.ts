import { Request, Response } from "express"
import quoterSchema from "../models/qouteCarousel"

export const getAllQuoteItems = async (_req: Request, res: Response) => {
  const quoteItems = await quoterSchema.find().sort({ createdAt: -1 }).limit(4)
  res.status(200).json({ message: "Quote Items fetched successfully", data: quoteItems })
}

export const createQuoteItem = async (req: Request, res: Response) => {
  const quoteItem = await quoterSchema.create(req.body)
  res.status(201).json({ message: "Quote Item created successfully", data: quoteItem })
}

export const updateQuoteItem = async (req: Request, res: Response) => {
  const updatedItem = await quoterSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!updatedItem) {
    res.status(404).json({ message: "Could not find item to update" })
    return
  }
  res.status(200).json({ message: "Quote Item updated successfully", data: updatedItem })
}

export const deleteQuoteItem = async (req: Request, res: Response) => {
  const deletedItem = await quoterSchema.findByIdAndDelete(req.params.id)
  if (!deletedItem) {
    res.status(404).json({ message: "Could not find item to delete" })
    return
  }
  res.status(200).json({ message: "Quote Item deleted Successfully" })
}
