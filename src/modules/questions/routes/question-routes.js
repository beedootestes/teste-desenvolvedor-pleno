import { Router } from 'express'

import GetAllQuestionController from '../controllers/get-all-question-controller'
import AddQuestionController from '../controllers/add-question-controller'

const router = Router()

router.get('/', GetAllQuestionController.handle)

router.post('/', AddQuestionController.handle)

export default router