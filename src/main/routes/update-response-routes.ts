import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adpater'
import { makeUpdateResponseController } from '../factories/update-response/update-response'

export default (router: Router): void => {
  router.post('/update-response/:question_id', adaptRoute(makeUpdateResponseController()))
}
