import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adpater'
import { makeDeleteQuestionController } from '../factories/delete-question/delete-question'

export default (router: Router): void => {
  router.delete('/delete-question/:id', adaptRoute(makeDeleteQuestionController()))
}
