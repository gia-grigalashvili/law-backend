import Router from "express"
import { requireAdmin } from "../middlewares/auth"
import { validateBunner } from "../middlewares/banners"
import { bunerSchema } from "../validator/banners"
import { getAllbunner, createbunner, udatebunner, deletebunner } from "../controllers/banners"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Bunners
 *   description: Banner management
 */

/**
 * @swagger
 * /bunners:
 *   get:
 *     summary: Get all bunners
 *     tags: [Bunners]
 *     responses:
 *       200:
 *         description: List of bunners
 */
router.get("/", getAllbunner)

/**
 * @swagger
 * /bunners:
 *   post:
 *     summary: Create a new bunner
 *     tags: [Bunners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bunner'
 *     responses:
 *       201:
 *         description: Bunner created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", requireAdmin, validateBunner(bunerSchema), createbunner)

/**
 * @swagger
 * /bunners/{id}:
 *   put:
 *     summary: Update a bunner
 *     tags: [Bunners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bunner'
 *     responses:
 *       200:
 *         description: Bunner updated successfully
 *       404:
 *         description: Bunner not found
 */
router.put("/:id", requireAdmin, validateBunner(bunerSchema), udatebunner)

/**
 * @swagger
 * /bunners/{id}:
 *   delete:
 *     summary: Delete a bunner
 *     tags: [Bunners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bunner deleted successfully
 *       404:
 *         description: Bunner not found
 */
router.delete("/:id", requireAdmin, deletebunner)

export default router
