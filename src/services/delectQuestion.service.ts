import QuestionsRepository from "../repositories/question.repository";
import { getCustomRepository } from "typeorm";
import { QuestionsDelected } from "../models/QuestionsDelected";
import QuestionsDelectedRepository from "../repositories/questionDelected.repository";
import { Questions } from "../models/Questions";

export interface IDelectQuestion {
  idQuestion: number;
}

export default class DelectQuestionService {
  async execute({ idQuestion }: IDelectQuestion) {
    try {
      const questionRepository = getCustomRepository(QuestionsRepository);
      const questionsDelectedRepository = getCustomRepository(
        QuestionsDelectedRepository
      );
      if (!idQuestion) {
        return "The Question Is Required";
      }
      const verifyIfExistsQuestion = await questionRepository.findOne(
        idQuestion
      );
      if (!verifyIfExistsQuestion) {
        return "This Question Not Exists";
      }
      const remove = await questionRepository
        .createQueryBuilder()
        .update()
        .set({ status: "delected" })
        .where("id = :id", { id: idQuestion })
        .execute();
      await questionsDelectedRepository
        .createQueryBuilder()
        .insert()
        .values({
          idQuestion,
        })
        .execute();
      console.log(remove);
      return "Question Delected.";
    } catch (err) {
      return err.message;
    }
  }
}
