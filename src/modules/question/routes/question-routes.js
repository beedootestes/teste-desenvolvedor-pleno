import { Router } from 'express'

import GetAllQuestionController from '../controllers/question/get-all-question-controller'
import GetByQuestionController from '../controllers/question/get-by-question-controller'
import AddQuestionController from '../controllers/question/add-question-controler'
import DeleteQuestionController from '../controllers/question/delete-question-controller'
import UpdateQuestionController from '../controllers/question/update-question-controller'

const router = Router()

router.get('/', GetAllQuestionController.handle)

router.get('/:id', GetByQuestionController.handle)

router.post('/', AddQuestionController.handle)

router.delete('/:id', DeleteQuestionController.handle)

router.patch('/:id', UpdateQuestionController.handle)

export default router