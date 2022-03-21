import { Answer } from '../../models/answer'

export default class AddAnswerController {
  

  static async handle(req, res) {

    const {answers} = req.body

    // //check questionId
    const isNotValidQuestionId = !!(answers.find(row => (row.questionId === undefined || row.questionId === '')))
   
    // //check answer
    const isNotValidAnswer = !!(answers.find(row => (row.answer === undefined || row.answer === '')))
    

    if (isNotValidQuestionId) {
      res.status(422).json({message: 'O Código da questão é obrigatória'})  
      return
    }
   
    if (isNotValidAnswer) {
      res.status(422).json({message: 'O Código da questão é obrigatória'})  
      return
    }
   
    try {
      // insert inside db
      const newAnswers =  await Answer.insertMany(answers)
      
      res.status(201).json(
        {
          message: 'Answer registered successfully',
          data:{
            newAnswers
          }
        })
    }
    catch (error) {      
      res.status(500).json({message: error})
    }

  }
}