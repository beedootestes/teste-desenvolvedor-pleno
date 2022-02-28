import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adpater'
import { makeGetQuestionsController } from '../factories/get-questions/get-questions'

export default (router: Router): void => {
  router.get('/get-questions', adaptRoute(makeGetQuestionsController()))
}
