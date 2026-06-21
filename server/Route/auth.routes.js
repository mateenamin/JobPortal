import { Router } from 'express'

const router = Router()

router.post('/register', (req, res) => res.json({ message: 'Register route ready!' }))
router.post('/login', (req, res) => res.json({ message: 'Login route ready!' }))

export default router