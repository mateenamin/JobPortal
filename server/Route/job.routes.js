import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => res.json({ message: 'Jobs route ready!' }))
router.post('/', (req, res) => res.json({ message: 'Post job route ready!' }))

export default router