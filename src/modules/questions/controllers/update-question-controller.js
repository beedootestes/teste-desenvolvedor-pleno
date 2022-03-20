import { Question } from '../models/question'

export default class UpdateQuestionController {
  
  static async handle(req, res) {

    const id = req.params.id
    
    const {question} = req.body

    if (!question || question.length === 0) {
      res.status(422).json({message: 'A questão é obrigatória'})
      return
    }
    
    const questionObj  = {
      question
    }

    try {
      await Question.findByIdAndUpdate(id, questionObj)
      
      res.status(200).json(
        {
          message: 'Question updated successfully',
          data:{
            
          }
        })
    }
    catch (error) {      
      res.status(500).json({message: error})
    }

  }
}