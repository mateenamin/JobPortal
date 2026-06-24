import { Router } from 'express'
import {
  applyJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus
} from '../Controller/application.controller.js'
import { protect, companyOnly } from '../Middleware/auth.middleware.js'

const router = Router()

// JobSeeker
router.post('/apply/:id', protect, applyJob)
router.get('/my', protect, getMyApplications)

// Company
router.get('/job/:id', protect, companyOnly, getJobApplicants)
router.put('/:id/status', protect, companyOnly, updateApplicationStatus)

export default router