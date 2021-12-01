import { Question } from "@modules/infra/typeorm/entities/Question";
import { IAnswersRepository } from "@modules/repositories/IAnswersRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
class ListAnswersByQuestionIdUseCase {
  constructor(
    @inject("AnswersRepository")
    private answersRepository: IAnswersRepository
  ) {}

  async execute(question_id: string): Promise<Question[]> {
    
    const questions = await this.answersRepository.findByQuestionId(question_id);


    if (questions.length === 0) {
        throw new AppError('Question does not exist')
    }


    return questions;
  }
}

export { ListAnswersByQuestionIdUseCase };
