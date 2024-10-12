import express from 'express'
import {
  createSummary,
  getSummaryById
} from '../controllers/summaryController.js'

const router = express.Router()

router.post('/', createSummary)

router.get('/:id', getSummaryById)

export default router
