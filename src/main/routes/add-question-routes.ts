import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adpater'
import { makeAddQuestionController } from '../factories/add-question/add-question'

export default (router: Router): void => {
  router.post('/add-question', adaptRoute(makeAddQuestionController()))
}
