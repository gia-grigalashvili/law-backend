import { Request, Response } from "express"
import bunner from "../models/banners"

export const getAllbunner = async (req: Request, res: Response) => {
  const item = await bunner.find().sort({ createdAt: -1 }).limit(4)
  res.status(200).json(item)
}

export const createbunner = async (req: Request, res: Response) => {
  const item = await bunner.create(req.body)
  res.status(201).json(item)
}

export const udatebunner = async (req: Request, res: Response) => {
  const updateItem = await bunner.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!updateItem) {
    res.status(404).json({ message: "bunner not found" })
  }
  res.status(200).json(updateItem)
}

export const deletebunner = async (req: Request, res: Response) => {
  const deleteItem = await bunner.findByIdAndDelete(req.params.id)
  if (!deleteItem) {
    res.status(404).json({ message: "bunner not found" })
  }
  res.status(200).json({ message: "Item deleted successfully" })
}
