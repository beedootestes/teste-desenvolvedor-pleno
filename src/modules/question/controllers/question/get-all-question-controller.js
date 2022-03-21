import { Question } from '../../models/question'

export default class GetAllQuestionController {
  static async handle(req, res) {
    
    try {
      const questionsData =  await GetAllQuestionController.getAll()
      res.status(200).json({
        message:'list of questions',
        data: questionsData
      })
    }
    catch (error) {
      res.status(500).json({message: error})
    }

  }

  static async getAll() {
    return await Question.find().select({__v:0});
  }

}
