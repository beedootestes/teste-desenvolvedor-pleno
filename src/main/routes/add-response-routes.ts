import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adpater'
import { makeAddResponseController } from '../factories/add-response/add-response'

export default (router: Router): void => {
  router.post('/add-response/:id', adaptRoute(makeAddResponseController()))
}
