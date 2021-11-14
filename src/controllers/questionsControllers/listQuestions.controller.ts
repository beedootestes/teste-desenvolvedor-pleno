import { AppResponse } from "../../@types";
import { Questions } from "../../models/Questions";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import QuestionsRepository from "../../repositories/question.repository";

export default class ListQuestionsController {
  async handle(request: Request, response: Response<AppResponse<Questions[]>>) {
    try {
      const questionRepository = getCustomRepository(QuestionsRepository),
        getAllQuestions = await questionRepository
          .createQueryBuilder()
          .select("questions")
          .from(Questions, "questions")
          .where({
            status: "Active",
          })
          .getMany();
      if (getAllQuestions.length >= 0) {
        return response.status(200).json({
          success: true,
          message: "All Questions",
          data: getAllQuestions,
        });
      }
      return response
        .status(400)
        .json({ success: false, message: "No Question Registred!" });
    } catch (err) {
      return response
        .status(500)
        .json({ success: false, message: err.message });
    }
  }
}
