import { Router } from 'express'
import { makeAddQuestionController } from '../factories/add-question'
import { adaptRoute } from '../adapters/express-routes-adpater'

export default (router: Router): void => {
  router.post('/add-question', adaptRoute(makeAddQuestionController()))
}
