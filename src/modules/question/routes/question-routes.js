import { Router } from 'express'
import { AddQuestionController, DeleteQuestionController, GetAllQuestionController, GetByQuestionController, UpdateQuestionController,  } from '../controllers/question'

const router = Router()

router.get('/', GetAllQuestionController.handle)

router.get('/:id', GetByQuestionController.handle)

router.post('/', AddQuestionController.handle)

router.delete('/:id', DeleteQuestionController.handle)

router.patch('/:id', UpdateQuestionController.handle)

export default router