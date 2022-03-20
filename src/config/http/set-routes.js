import { Router } from 'express'
import questionRouter from '../../modules/question/routes/question-routes'
import answerRouter from '../../modules/question/routes/answer-routes'

export default (app) => {
  const router = Router()
  // app.use('/api', router)  
  app.use('/api/question', questionRouter)
  app.use('/api/answer', answerRouter)
}
