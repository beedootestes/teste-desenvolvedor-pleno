import { Question } from "@modules/questions/infra/typeorm/entities/Question";
import { IAnswersRepository } from "@modules/questions/repositories/IAnswersRepository";
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

    if (!questions) {
        throw new AppError('Question does not exist')
    }


    return questions;
  }
}

export { ListAnswersByQuestionIdUseCase };
