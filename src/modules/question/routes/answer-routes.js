import { Router } from 'express'
import { AddAnswerController, UpdateAnswerController,DeleteAnswerController, GetAllAnswerQuestionController, GetAnswerByQuestionController } from '../controllers/answer'


const router = Router()

router.post('/',  AddAnswerController.handle)

router.patch('/:id', UpdateAnswerController.handle)
router.patch('/', UpdateAnswerController.handle)

router.delete('/:id', DeleteAnswerController.handle)
router.delete('/', DeleteAnswerController.handle)

router.get('/question/', GetAllAnswerQuestionController.handle)
router.get('/question/:questionId', GetAnswerByQuestionController.handle)


export default router