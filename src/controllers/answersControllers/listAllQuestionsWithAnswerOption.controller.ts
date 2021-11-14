import { AppResponse } from "../../@types";
import { Request, Response } from "express";
import { Answers } from "../../models/Answers";
import { getCustomRepository } from "typeorm";
import AnswersRepository from "../../repositories/answers.repository";

export default class ListAllQuestionsWithAnswerOptionController {
  async handle(request: Request, response: Response<AppResponse<Answers[]>>) {
    try {
      const answersRepository = getCustomRepository(AnswersRepository);
      const listAllQuestionWithAnswers = await answersRepository
        .createQueryBuilder("answers")
        .select()
        .orderBy("answers.idQuestion")
        .getMany();
      if (listAllQuestionWithAnswers.length > 0) {
        return response.status(200).json({
          success: true,
          message: "All Questions with Answers",
          data: listAllQuestionWithAnswers,
        });
      }
      return response
        .status(400)
        .json({ success: false, message: "Error! No Answers is Registred." });
    } catch (err) {
      return response.status(500).json({ success: false, data: err.message });
    }
  }
}
