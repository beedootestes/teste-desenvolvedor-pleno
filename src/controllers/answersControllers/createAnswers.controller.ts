import { AppResponse } from "../../@types";
import { Answers } from "../../models/Answers";
import CreateAnswerService, {
  ICreateAnswers,
} from "../../services/answersServices/createAnswers.service";
import { Request, Response } from "express";

export default class CreateAnswersController {
  async handle(
    request: Request<ICreateAnswers>,
    response: Response<AppResponse<Answers[]>>
  ) {
    try {
      const createAnswersService = new CreateAnswerService();
      const createAnswer = await createAnswersService.execute(request.body);
      if (createAnswer) {
        return response.status(200).json({
          success: true,
          data: createAnswer,
        });
      }
      return response
        .status(400)
        .json({ success: false, message: "Error! Try Again." });
    } catch (err) {
      return response.status(500).json({ success: false, data: err.message });
    }
  }
}
