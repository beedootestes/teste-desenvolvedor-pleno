import { Router } from 'express'

import GetAllQuestionController from '../controllers/get-all-question-controller'
import AddQuestionController from '../controllers/add-question-controller'
import GetByQuestionController from '../controllers/get-by-question-controller'

const router = Router()

router.get('/', GetAllQuestionController.handle)

router.get('/:id', GetByQuestionController.handle)

router.post('/', AddQuestionController.handle)

export default router