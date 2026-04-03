const express = require('express');
const { getSummary } = require('../controllers/summaryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/summary:
 *   get:
 *     summary: Get dashboard analytics summary
 *     tags: [Summary]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Analytics data }
 */
router.get('/', authorize('Analyst', 'Admin'), getSummary);

module.exports = router;
