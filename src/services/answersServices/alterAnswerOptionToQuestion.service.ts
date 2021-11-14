import QuestionsRepository from "../../repositories/question.repository";
import { getCustomRepository } from "typeorm";
import AnswersRepository from "../../repositories/answers.repository";

export interface IAlterAnswer {
  idQuestion: number;
  answers: string;
}

export default class AlterAnswerOptionService {
  async execute({ idQuestion, answers }: IAlterAnswer) {
    try {
      const questionRepository = getCustomRepository(QuestionsRepository);
      const answersRepository = getCustomRepository(AnswersRepository);
      if (!idQuestion || !answers) {
        return "All data is required.";
      }
      const verifyExistsQuestion = await questionRepository.findOne(idQuestion);
      if (!verifyExistsQuestion) {
        return "This Question Not Exists.";
      }
      const alter = await answersRepository
        .createQueryBuilder()
        .update()
        .set({ answers })
        .where("idQuestion = :idQuestion", { idQuestion })
        .execute();
      return alter;
    } catch (err) {
      return err.message;
    }
  }
}
