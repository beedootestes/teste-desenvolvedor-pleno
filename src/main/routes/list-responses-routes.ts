import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adpater'
import { makeListResponsesController } from '../factories/list-responses/list-responses'

export default (router: Router): void => {
  router.get('/list-responses/:id', adaptRoute(makeListResponsesController()))
}
