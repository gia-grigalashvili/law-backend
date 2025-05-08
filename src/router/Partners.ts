import Router from "express"
import { requireAdmin } from "../middlewares/auth"
import { validate } from "../middlewares/validate"
import { PartnersSchema } from "../validator/Partners"
import {
  getAllPartners,
  createPartners,
  udatePartners,
  deletePartners,
} from "../controllers/Partners"

const router = Router()

router.get("/", getAllPartners)

router.post("/", requireAdmin, validate(PartnersSchema), createPartners)

router.put("/:id", requireAdmin, validate(PartnersSchema), udatePartners)

router.delete("/:id", requireAdmin, deletePartners)

export default router
