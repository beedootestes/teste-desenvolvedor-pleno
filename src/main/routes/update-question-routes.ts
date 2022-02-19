import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adpater'
import { makeUpdateQuestionController } from '../factories/update-question/update-question'

export default (router: Router): void => {
  router.post('/update-question/:id', adaptRoute(makeUpdateQuestionController()))
}
