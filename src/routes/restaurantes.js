import { Router } from 'express'

const router = Router()

// GET /api/test
router.get('/restaurantes', (req, res) => {
  res.send('restaurantes')
})

export default router