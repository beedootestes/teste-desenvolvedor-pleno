import { Router } from 'express'
import AddAnswerController from '../controllers/answer/add-answer-controler'
import UpdateAnswerController from '../controllers/answer/update-answer-controller'

import { notFound } from '../../../config/helpers/http-helper'

const router = Router()

router.post('/',  AddAnswerController.handle)

router.patch('/:id', UpdateAnswerController.handle)
router.patch('/', UpdateAnswerController.handle)

// router.get('/', GetAllQuestionController.handle)

// router.get('/:id', GetByQuestionController.handle)

// router.delete('/:id', DeleteQuestionController.handle)


export default router