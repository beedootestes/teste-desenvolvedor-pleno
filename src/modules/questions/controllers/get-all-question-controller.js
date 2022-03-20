import { Question } from '../models/question'

export default class getAllQuestionController {
  static async handle(req, res) {
    
    try {
      const questionsData =  await Question.find().select({__v:0})
      res.status(200).json({
        message:'list of questions',
        data: questionsData
      })
    }
    catch (error) {
      res.status(500).json({message: error})
    }

  }
}