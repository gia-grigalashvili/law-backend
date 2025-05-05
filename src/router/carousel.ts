import Router from "express"
import { requireAdmin } from "../middlewares/auth"
import { validate } from "../middlewares/validate"
import { carouselSchema } from "../validator/carousel"
import {
  getAllCarousel,
  createCarousel,
  udateCarousel,
  deleteCarousel,
} from "../controllers/carousel"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Carousel
 *   description: Carousel management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Carousel:
 *       type: object
 *       required:
 *         - title
 *         - image
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the carousel item
 *         image:
 *           type: string
 *           format: uri
 *           description: URL of the carousel image
 *       example:
 *         title: Summer Sale
 *         image: https://example.com/banner.jpg
 */

/**
 * @swagger
 * /carousel:
 *   get:
 *     summary: Get all carousel items
 *     tags: [Carousel]
 *     responses:
 *       200:
 *         description: List of carousel items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carousel'
 */
router.get("/", getAllCarousel)

/**
 * @swagger
 * /carousel:
 *   post:
 *     summary: Create a new carousel item
 *     tags: [Carousel]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carousel'
 *     responses:
 *       201:
 *         description: Carousel item created successfully
 */
router.post("/", requireAdmin, validate(carouselSchema), createCarousel)

/**
 * @swagger
 * /carousel/{id}:
 *   put:
 *     summary: Update a carousel item
 *     tags: [Carousel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Carousel item ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carousel'
 *     responses:
 *       200:
 *         description: Carousel item updated successfully
 */
router.put("/:id", requireAdmin, validate(carouselSchema), udateCarousel)

/**
 * @swagger
 * /carousel/{id}:
 *   post:
 *     summary: Delete a carousel item
 *     tags: [Carousel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Carousel item ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carousel item deleted successfully
 */
router.delete("/:id", requireAdmin, deleteCarousel)

export default router
