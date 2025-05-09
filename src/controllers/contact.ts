import { Request, Response } from "express"
import Contact from "../models/contact"
export const getContacts = async (req: Request, res: Response) => {
  const contacts = await Contact.find()
  res.status(200).json({
    message: "Contacts fetched successfully",
    contacts,
  })
}

export const createContact = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const [messages, total] = await Promise.all([
    Contact.find().skip(skip).limit(limit),
    Contact.countDocuments(),
  ])

  res.status(200).json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: messages,
  })
}

export const deleteContact = async (req: Request, res: Response) => {
  const contact = await Contact.findByIdAndDelete(req.params.id)
  if (!contact) {
    res.status(404).json({
      message: "Contact not found",
    })
    return
  }
  res.status(200).json({
    message: "Contact deleted successfully",
    contact,
  })
}
