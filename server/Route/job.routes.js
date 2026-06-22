import { Router } from 'express'
import {
  createJob,
  getAllJobs,
  getJob,
  getCompanyJobs,
  updateJob,
  deleteJob,
  updateJobStatus,
  getAllJobsAdmin
} from '../Controller/job.controller.js'
import { protect, adminOnly, companyOnly } from '../Middleware/auth.middleware.js'

const router = Router()

// Public
router.get('/', getAllJobs)
router.get('/:id', getJob)

// Company
router.post('/', protect, companyOnly, createJob)
router.get('/company/myjobs', protect, companyOnly, getCompanyJobs)
router.put('/:id', protect, companyOnly, updateJob)
router.delete('/:id', protect, companyOnly, deleteJob)

// Admin
router.get('/admin/all', protect, adminOnly, getAllJobsAdmin)
router.put('/admin/:id/status', protect, adminOnly, updateJobStatus)

export default router