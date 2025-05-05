import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import Admin from "../models/Admin"
import { generateToken } from "../utils/jwt"

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body //ammoigo bodddan

  const exisitingAdmin = await Admin.findOne({ email })
  if (exisitingAdmin) {
    res.status(400).json({ Message: "admin arleady exists" })
  } //amowmebs meili aris tu ara

  const hashedPaddword = await bcrypt.hash(password, 10) //hash savs parols
  const admin = await Admin.create({ email, password: hashedPaddword })
  const token = generateToken(admin._id.toString())

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
  })

  res.status(201).json({ message: "admin registered succes" })
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  // admin arsebobs tu ara
  const admin = await Admin.findOne({ email })
  if (!admin) {
    res.status(400).json({ Message: "invalid credentials" })
    return
  }

  const match = await bcrypt.compare(password, admin.password)
  if (!match) {
    res.status(401).json({ message: "invalid credentials" })
    return
  }

  const token = generateToken(admin._id.toString())
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
  })
  res.status(200).json({ message: "admin logged in successfully" })
}
