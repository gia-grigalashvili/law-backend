import Router from "express"
import { requireAdmin } from "../middlewares/auth"
import { validateBunner } from "../middlewares/banners"
import { bunerSchema } from "../validator/banners"
import { getAllbunner, createbunner, udatebunner, deletebunner } from "../controllers/banners"

const router = Router()

router.get("/", getAllbunner)

router.post("/", requireAdmin, validateBunner(bunerSchema), createbunner)

router.put("/:id", requireAdmin, validateBunner(bunerSchema), udatebunner)

router.delete("/:id", requireAdmin, deletebunner)

export default router

/**
 * @swagger
 * tags:
 *   name: Bunners
 *   description: Banner management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Bunner:
 *       type: object
 *       required:
 *         - title
 *         - image
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           description: The title of the banner
 *         subtitle:
 *           type: string
 *           description: Optional subtitle of the banner
 *         image:
 *           type: string
 *           format: uri
 *           description: URL of the banner image
 *         link1:
 *           type: string
 *           format: uri
 *           description: Optional external link for the banner
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bunner'
 */

/**
 * @swagger
 * /bunners:
 *   post:
 *     summary: Create a new bunner
 *     tags: [Bunners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bunner'
 *     responses:
 *       201:
 *         description: Bunner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bunner'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /bunners/{id}:
 *   put:
 *     summary: Update a bunner
 *     tags: [Bunners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bunner to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bunner'
 *     responses:
 *       200:
 *         description: Bunner updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Bunner not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /bunners/{id}:
 *   delete:
 *     summary: Delete a bunner
 *     tags: [Bunners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bunner to delete
 *     responses:
 *       200:
 *         description: Bunner deleted successfully
 *       404:
 *         description: Bunner not found
 *       401:
 *         description: Unauthorized
 */
