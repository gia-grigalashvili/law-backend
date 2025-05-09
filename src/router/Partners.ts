/**
 * @swagger
 * components:
 *   schemas:
 *     Partner:
 *       type: object
 *       required:
 *         - title
 *         - subtitle
 *         - image
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique ID of the partner
 *         title:
 *           type: string
 *           description: Title of the partner
 *         subtitle:
 *           type: string
 *           description: Subtitle or description of the partner
 *         image:
 *           type: string
 *           description: Image URL of the partner
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         title: Example Partner
 *         subtitle: Trusted by 100+ clients
 *         image: https://example.com/image.jpg
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-01T00:00:00.000Z
 */

/**
 * @swagger
 * /api/partners:
 *   get:
 *     summary: Get all partners
 *     tags: [Partners]
 *     responses:
 *       200:
 *         description: List of all partners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Partner'
 *   post:
 *     summary: Create a new partner
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partner'
 *     responses:
 *       201:
 *         description: Partner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Partner'

 * /partners/{id}:
 *   put:
 *     summary: Update a partner
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the partner to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partner'
 *     responses:
 *       200:
 *         description: Partner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Partner'

 *   delete:
 *     summary: Delete a partner
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the partner to delete
 *     responses:
 *       200:
 *         description: Partner deleted successfully
 */

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
