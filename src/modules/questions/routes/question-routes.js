import { Router } from 'express'

import GetAllQuestionController from '../controllers/get-all-question-controller'
import AddQuestionController from '../controllers/add-question-controller'
import GetByQuestionController from '../controllers/get-by-question-controller'
import DeleteQuestionController from '../controllers/delete-question-controller'

const router = Router()

router.get('/', GetAllQuestionController.handle)

router.get('/:id', GetByQuestionController.handle)

router.post('/', AddQuestionController.handle)

router.delete('/:id', DeleteQuestionController.handle)

export default router