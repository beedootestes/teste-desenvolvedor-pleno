import { Question } from "@modules/questions/infra/typeorm/entities/Question";
import { IQuestionsRepository } from "@modules/questions/repositories/IQuestionsRepository";
import { inject, injectable } from "tsyringe";



@injectable()
class ListQuestionsUseCase {
  constructor(
    @inject("QuestionsRepository")
    private questionsRepository: IQuestionsRepository
  ) {}

  async execute(): Promise<Question[]> {
    const questions = await this.questionsRepository.find();


    return questions;
  }
}

export { ListQuestionsUseCase };
