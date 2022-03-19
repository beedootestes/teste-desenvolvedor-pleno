import { Router } from 'express'
import questionRouter from '../../modules/questions/routes/question-routes'
import answerRouter from '../../modules/questions/routes/answer-routes'

export default (app) => {
  const router = Router()
  // app.use('/api', router)  
  app.use('/api/question', questionRouter)
  app.use('/api/answer', answerRouter)
}
