import { Router } from 'express'
import { register, login, getProfile } from '../Controller/auth.controller.js'
import { protect } from '../Middleware/auth.middleware.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', protect, getProfile)

export default router