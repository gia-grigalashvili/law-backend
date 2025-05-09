import { Router } from "express"
import { validate } from "../middlewares/validate"
import { requireAdmin } from "../middlewares/auth"
import { createContact, getContacts, deleteContact } from "../controllers/contact"
import { contactSchema } from "../validator/contact"

const router = Router()

router.post("/", validate(contactSchema), createContact)

router.get("/", requireAdmin, getContacts)
router.delete("/:id", requireAdmin, deleteContact)

export default router
/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact management endpoints
 *
 * /api/contact:
 *   post:
 *     summary: Create a new contact message
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Invalid input data
 *
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all contacts
 *       401:
 *         description: Unauthorized - Admin access required
 *
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Contact not found
 */
