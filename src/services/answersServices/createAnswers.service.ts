import { Answers } from "../../models/Answers";
import AnswersRepository from "../../repositories/answers.repository";
import { getCustomRepository } from "typeorm";
import QuestionsRepository from "../../repositories/question.repository";

export interface ICreateAnswers {
  idQuestion: number;
  answers: string;
}

export default class CreateAnswerService {
  async execute({ idQuestion, answers }: ICreateAnswers) {
    try {
      const answersRepository = getCustomRepository(AnswersRepository);
      const questionRepository = getCustomRepository(QuestionsRepository);
      const verifyExists = await questionRepository.findOne({
        where: { id: idQuestion },
      });
      if (!verifyExists) {
        return "This Questions not exists.";
      }
      const saveAnswer = await answersRepository
        .createQueryBuilder()
        .insert()
        .into(Answers)
        .values({
          idQuestion,
          answers,
        })
        .execute();
      return saveAnswer;
    } catch (err) {
      return err.message;
    }
  }
}
