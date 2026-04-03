const express = require('express');
const {
    getRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord
} = require('../controllers/recordController');
const { protect, authorize } = require('../middleware/auth');
const { validateRecord } = require('../middleware/validator');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all financial records
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search description
 *       - in: query
 *         name: sort
 *         schema: { type: string }
 *         description: Sort fields (e.g., -amount,createdAt)
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: List of records }
 *   post:
 *     summary: Create new record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, type, category, description]
 *             properties:
 *               amount: { type: number }
 *               type: { type: string, enum: [income, expense] }
 *               category: { type: string }
 *               description: { type: string }
 *               date: { type: string, format: date }
 *     responses:
 *       201: { description: Created }
 */
router
    .route('/')
    .get(getRecords)
    .post(authorize('Analyst', 'Admin'), validateRecord, createRecord);

/**
 * @swagger
 * /api/records/{id}:
 *   get:
 *     summary: Get single record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Success }
 *   put:
 *     summary: Update record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount: { type: number }
 *               type: { type: string, enum: [income, expense] }
 *               category: { type: string }
 *               description: { type: string }
 *     responses:
 *       200: { description: Updated }
 *   delete:
 *     summary: Soft delete record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted }
 */
router
    .route('/:id')
    .get(getRecord)
    .put(authorize('Admin'), validateRecord, updateRecord)
    .delete(authorize('Admin'), deleteRecord);

module.exports = router;
