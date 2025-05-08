import { Request, Response } from "express"
import Partners from "../models/Partners"

export const getAllPartners = async (req: Request, res: Response) => {
  const partners = await Partners.find()
  res.status(200).json(partners)
}

export const createPartners = async (req: Request, res: Response) => {
  const item = await Partners.create(req.body)
  res.status(201).json(item)
}

export const udatePartners = async (req: Request, res: Response) => {
  const updateItem = await Partners.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!updateItem) {
    res.status(404).json({ message: "Partners not found" })
  }
  res.status(200).json(updateItem)
}

export const deletePartners = async (req: Request, res: Response) => {
  const deleteItem = await Partners.findByIdAndDelete(req.params.id)
  if (!deleteItem) {
    res.status(404).json({ message: "Partners not found" })
  }
  res.status(200).json({ message: "Item deleted successfully" })
}
