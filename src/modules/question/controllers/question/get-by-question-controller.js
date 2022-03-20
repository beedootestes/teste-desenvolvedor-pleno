import { Question } from '../../models/question'

export default class GetByQuestionController {
  static async handle(req, res) {

    const id  =  req.params.id
        
    try {
      const questionData =  await Question.findById(id).select({__v:0})
      res.status(200).json({
        message:'question',
        data: questionData
      })
    }
    catch (error) {
      res.status(500).json({message: error})
    }

  }
}