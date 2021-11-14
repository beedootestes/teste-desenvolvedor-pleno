import { AppResponse } from "../../@types";
import { Request, Response } from "express";
import { Questions } from "../../models/Questions";
import { ICreateQuestion } from "../../services/questionsServices/createQuestion.service";
import CreateQuestionService from "../../services/questionsServices/createQuestion.service";

export default class CreateQuestionController {
  async handle(
    request: Request<ICreateQuestion>,
    response: Response<AppResponse<Questions[]>>
  ) {
    try {
      const { question, description } = request.body,
        createQuestionService = new CreateQuestionService(),
        createQuestion = await createQuestionService.execute({
          question,
          description,
        });
      if (createQuestion) {
        return response.status(201).json({
          success: true,
          message: createQuestion,
        });
      }
      return response
        .status(400)
        .json({ success: false, message: " Error! Please Try Again!" });
    } catch (err) {
      return response
        .status(500)
        .json({ success: false, message: err.message });
    }
  }
}
