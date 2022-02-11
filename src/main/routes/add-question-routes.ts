import { Router } from 'express'

export default (router: Router): void => {
  router.post('/add-question', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
