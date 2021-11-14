import { AppResponse } from "../../@types";
import { Request, Response } from "express";
import { Questions } from "../../models/Questions";
import AlterQuestionService, {
  IAlterQuestion,
} from "../../services/questionsServices/alterQuestion.service";

export default class AlterQuestionController {
  async handle(
    request: Request<IAlterQuestion>,
    response: Response<AppResponse<Questions[]>>
  ) {
    try {
      const alterQuestionService = new AlterQuestionService(),
        alterQuestion = await alterQuestionService.execute(request.body);
      if (alterQuestion) {
        return response
          .status(200)
          .json({ success: true, data: alterQuestion });
      }
      return response.status(400).json({ success: false, message: "Error!" });
    } catch (err) {
      return response
        .status(500)
        .json({ success: false, message: err.message });
    }
  }
}
