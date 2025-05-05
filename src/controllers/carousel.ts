import { Request, Response } from "express"
import carousel from "../models/Carousel"

export const getAllCarousel = async (req: Request, res: Response) => {
  const item = await carousel.find().sort({ createdAt: -1 }).limit(4)
  res.status(200).json(item)
}

export const createCarousel = async (req: Request, res: Response) => {
  const item = await carousel.create(req.body)
  res.status(201).json(item)
}

export const udateCarousel = async (req: Request, res: Response) => {
  const updateItem = await carousel.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!updateItem) {
    res.status(404).json({ message: "carousel not found" })
  }
  res.status(200).json(updateItem)
}

export const deleteCarousel = async (req: Request, res: Response) => {
  const deleteItem = await carousel.findByIdAndDelete(req.params.id)
  if (!deleteItem) {
    res.status(404).json({ message: "carousel not found" })
  }
  res.status(200).json({message:"Item deleted successfully"})
}
