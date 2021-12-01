import { Question } from "@modules/questions/infra/typeorm/entities/Question";
import { IAnswersRepository } from "@modules/questions/repositories/IAnswersRepository";
import { IQuestionsRepository } from "@modules/questions/repositories/IQuestionsRepository";
import { inject, injectable } from "tsyringe";



@injectable()
class ListQuestionsUseCase {
  constructor(
    @inject("QuestionsRepository")
    private questionsRepository: IQuestionsRepository,

    @inject("AnswersRepository")
    private answersRepository: IAnswersRepository
  ) {}

  async execute(): Promise<Question[] | any> {
      
      const listQuestions = await this.questionsRepository.find();
    
    const questions = listQuestions.map(async questionList => {

        const {id} = questionList;

        const answers = await this.answersRepository.findByQuestionId(id)

        const questionListWithAnswers = {
            question, 
            answers
        }

        return questionWithAnswers;
 
    });


    return questions;
  }
}

export { ListQuestionsUseCase };
