import AnswersRepository from "../../repositories/answers.repository";
import { getCustomRepository } from "typeorm";

export interface IDelectAnswerToQuestion {
  idQuestionAnswer: number;
  idAnswer: number;
}

export default class DelectAnswerToQuestionService {
  async execute({ idQuestionAnswer, idAnswer }: IDelectAnswerToQuestion) {
    try {
      const answersRepository = getCustomRepository(AnswersRepository);
      const verifyIfExistsAnswer = await answersRepository.find({
        where: { id: idAnswer },
      });
      if (!verifyIfExistsAnswer) {
        return "This Answers not exists.";
      }
      const [{ idQuestion }] = verifyIfExistsAnswer;
      if (!idQuestion) {
        return "This Answers Not is Relactioned With this Question";
      }
      if (idQuestion == idQuestionAnswer) {
        await answersRepository
          .createQueryBuilder()
          .delete()
          .where("id = :id", { id: idAnswer })
          .execute();
        return "Option Answer Delected.";
      }
      return "This Question Not is Relacioned with this question.";
    } catch (err) {
      return err.message;
    }
  }
}
