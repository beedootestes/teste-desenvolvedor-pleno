import { Questions } from "../models/Questions";
import QuestionsRepository from "../repositories/question.repository";
import { getCustomRepository } from "typeorm";

export interface IAlterQuestion {
  idQuestion: number;
  question?: string;
  description?: string;
}

export default class AlterQuestionService {
  async execute({ idQuestion, question, description }: IAlterQuestion) {
    try {
      const questionRepository = getCustomRepository(QuestionsRepository);
      if (!idQuestion && !question && !description) {
        return "Please write all datas that you want alter.";
      }
      const verifyExistsQuestion = await questionRepository.findOne(idQuestion);
      if (!verifyExistsQuestion) {
        return "This Question Not Exists.";
      }
      if (!question) {
        const alterQuestionDescription = await questionRepository
          .createQueryBuilder()
          .update(Questions)
          .set({ description: "" + description })
          .where("id = :id", { id: idQuestion })
          .execute();
        return "Description Altered.";
      } else {
        if (!description) {
          const alterQuestion = await questionRepository
            .createQueryBuilder()
            .update(Questions)
            .set({ question })
            .where("id = :id", { id: idQuestion })
            .execute();
          return "Question altered.";
        } else {
          const alterQuestionDatas = await questionRepository
            .createQueryBuilder()
            .update(Questions)
            .set({ question, description })
            .where("id = :id", { id: idQuestion })
            .execute();
          return "Question altered.";
        }
      }
    } catch (err) {
      return err.message;
    }
  }
}
