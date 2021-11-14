import { AppResponse } from "../../@types";
import { Request, Response } from "express";
import AlterAnswerOptionService, {
  IAlterAnswer,
} from "../../services/answersServices/alterAnswerOptionToQuestion.service";
import { Answers } from "../../models/Answers";

export default class AlterAnswerOptionToQuestionController {
  async handle(
    request: Request<IAlterAnswer>,
    response: Response<AppResponse<Answers[]>>
  ) {
    try {
      const alterAnswerOptionToQuestion = new AlterAnswerOptionService(),
        alterAnswer = await alterAnswerOptionToQuestion.execute(request.body);
      if (alterAnswer) {
        return response.status(200).json({ success: true, data: alterAnswer });
      }
      return response.status(400).json({ success: false, message: "Error!" });
    } catch (err) {
      return response
        .status(500)
        .json({ success: false, message: err.message });
    }
  }
}
