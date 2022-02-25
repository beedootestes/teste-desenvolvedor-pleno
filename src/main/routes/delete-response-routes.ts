import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adpater'
import { makeDeleteResponseController } from '../factories/delete-response/delete-response'

export default (router: Router): void => {
  router.delete('/delete-response/:question_id', adaptRoute(makeDeleteResponseController()))
}
