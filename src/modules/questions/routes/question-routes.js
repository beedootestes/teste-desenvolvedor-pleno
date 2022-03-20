import { Router } from 'express'
import AddQuestionController from '../controllers/add-question-controller'

const router = Router()

router.get('/', (req, res) => {
  res.json({ ok: 'ok' })
})

router.post('/', AddQuestionController.add)


export default router