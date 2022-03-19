import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ ok: 'ok' })
})


export default router