import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ respostas: 'ok' })
})

export default router