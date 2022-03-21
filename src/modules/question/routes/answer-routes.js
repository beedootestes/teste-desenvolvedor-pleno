import { Router } from 'express'
import AddAnswerController from '../controllers/answer/add-answer-controler'

const router = Router()

router.post('/',  AddAnswerController.handle)

// router.get('/', GetAllQuestionController.handle)

// router.get('/:id', GetByQuestionController.handle)

// router.delete('/:id', DeleteQuestionController.handle)

// router.patch('/:id', UpdateQuestionController.handle)

export default router