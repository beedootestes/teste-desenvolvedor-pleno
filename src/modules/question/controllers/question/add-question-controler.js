import { Question } from '../../models/question'

export default class AddQuestionController {
  
  static async handle(req, res) {

    const {question} = req.body

    if (!question || question.length === 0) {
      res.status(422).json({message: 'A questão é obrigatória'})
      return
    }
    
    const questionObj  = new Question({
      question
    })

    try {
      const newQuestion =  await questionObj.save()
      
      res.status(201).json(
        {
          message: 'Question registered successfully',
          data:{
            id: newQuestion.id
          }
        })
    }
    catch (error) {      
      res.status(500).json({message: error})
    }

  }
}