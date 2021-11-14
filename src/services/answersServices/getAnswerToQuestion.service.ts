import AnswersRepository from "../../repositories/answers.repository";
import { getCustomRepository } from "typeorm";

export interface IGetAnswers {
  idQuestion: number;
}

export default class GetAnswerToQuestionService {
  async execute({ idQuestion }: IGetAnswers) {
    try {
      const answersRepository = getCustomRepository(AnswersRepository);
      const getAnswers = await answersRepository.find({
        where: { idQuestion },
      });
      if (getAnswers.length > 0) {
        return getAnswers;
      }
      return "No answer was created for this question.";
    } catch (err) {
      return err.message;
    }
  }
}
