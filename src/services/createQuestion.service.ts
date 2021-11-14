import { Questions } from "../models/Questions";
import QuestionsRepository from "../repositories/question.repository";
import { getCustomRepository } from "typeorm";

export interface ICreateQuestion {
  question: string;
  description?: String;
}

export default class CreateQuestionService {
  async execute({ question, description }: ICreateQuestion) {
    try {
      const questionRepository = getCustomRepository(QuestionsRepository);
      if (!question) {
        return "The question is required";
      }
      const alreadyExistsQuestion = await questionRepository.findOne({
        where: { question },
      });
      if (alreadyExistsQuestion) {
        const { status } = alreadyExistsQuestion;
        if (status != "delected") {
          return "This Question Already Exists in this Database!";
        }
        const createQuestion = await questionRepository
          .createQueryBuilder()
          .insert()
          .into(Questions)
          .values({
            question,
            description: "" + description,
            status: "Active",
          })
          .execute();
        if (createQuestion) {
          return "Question Created With Sucess!";
        }
      }
    } catch (err) {
      return err.message;
    }
  }
}
