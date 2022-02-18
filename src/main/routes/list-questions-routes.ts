import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adpater'
import { makeListQuestionsController } from '../factories/list-questions'

export default (router: Router): void => {
  router.get('/list-questions', adaptRoute(makeListQuestionsController()))
}
