import express from 'express'
import {
  createSummary,
  getSummaryById
} from '../controllers/summaryController.js'

const router = express.Router()

// Route to create a new summary
router.post('/', createSummary)

// Route to get summary by ID
router.get('/:id', getSummaryById)

export default router
