import { Question } from '../models/question'

export default class DeleteQuestionController {
  static async handle(req, res) {

    const id  =  req.params.id
        
    try {
      await Question.findOneAndDelete(id)
      res.status(200).json({
        message:'question deleted successfully',
        data: {}
      })
    }
    catch (error) {
      res.status(500).json({message: error})
    }

  }
}