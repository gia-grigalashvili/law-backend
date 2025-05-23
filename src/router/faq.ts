import { Router } from "express"
import { validate } from "../middlewares/validate"
import { requireAdmin } from "../middlewares/auth"
import { createFaq, deleteFaq, getFaqs, updateFaq } from "../controllers/faq"
import { faqSchema } from "../validator/faq"

const router = Router()

router.get("/", getFaqs)

router.post("/", requireAdmin, validate(faqSchema), createFaq)
router.put("/:id", requireAdmin, validate(faqSchema), updateFaq)
router.delete("/:id", requireAdmin, deleteFaq)

export default router
/**
 * @swagger
 * tags:
 *   name: FAQ
 *   description: FAQ management endpoints
 *
 * /api/faq:
 *   get:
 *     summary: Get all FAQ
 *     tags: [FAQ]
 *     responses:
 *       200:
 *         description: List of all FAQ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 faqs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       question:
 *                         type: string
 *                       answer:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *
 *   post:
 *     summary: Create a new FAQ
 *     tags: [FAQ]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       201:
 *         description: FAQ created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Admin access required
 *
 * /api/faq/{id}:
 *   put:
 *     summary: Update a FAQ
 *     tags: [FAQ]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: FAQ ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: FAQ not found
 *
 *   delete:
 *     summary: Delete a FAQ
 *     tags: [FAQ]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: FAQ ID
 *     responses:
 *       200:
 *         description: FAQ deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: FAQ not found
 */
