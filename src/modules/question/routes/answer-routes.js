import { Router } from 'express'
import AddAnswerController from '../controllers/answer/add-answer-controler'
import UpdateAnswerController from '../controllers/answer/update-answer-controller'
import DeleteQuestionController from '../controllers/answer/delete-answer-controller'

import { notFound } from '../../../config/helpers/http-helper'

const router = Router()

router.post('/',  AddAnswerController.handle)

router.patch('/:id', UpdateAnswerController.handle)
router.patch('/', UpdateAnswerController.handle)

router.delete('/:id', DeleteQuestionController.handle)
router.delete('/', DeleteQuestionController.handle)

// router.get('/', GetAllQuestionController.handle)

// router.get('/:id', GetByQuestionController.handle)


export default router