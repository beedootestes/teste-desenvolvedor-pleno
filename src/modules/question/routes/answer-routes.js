import { Router } from 'express'
import AddAnswerController from '../controllers/answer/add-answer-controler'
import UpdateAnswerController from '../controllers/answer/update-answer-controller'
import DeleteQuestionController from '../controllers/answer/delete-answer-controller'
import GetAnswerByQuestionController from '../controllers/answer/get-answer-by-question-controller'
import GetAllAnswerQuestionController from '../controllers/answer/get-all-answer-question-controller'


const router = Router()

router.post('/',  AddAnswerController.handle)

router.patch('/:id', UpdateAnswerController.handle)
router.patch('/', UpdateAnswerController.handle)

router.delete('/:id', DeleteQuestionController.handle)
router.delete('/', DeleteQuestionController.handle)

router.get('/question/', GetAllAnswerQuestionController.handle)
router.get('/question/:questionId', GetAnswerByQuestionController.handle)


export default router