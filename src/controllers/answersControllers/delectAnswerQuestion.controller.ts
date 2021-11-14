import { AppResponse } from "../../@types";
import { Answers } from "../../models/Answers";
import DelectAnswerToQuestionService, {
  IDelectAnswerToQuestion,
} from "../../services/answersServices/delectAnswerToQuestion.service";
import { Request, Response } from "express";

export default class DelectAnswerToQuestionController {
  async hanle(
    request: Request<IDelectAnswerToQuestion>,
    response: Response<AppResponse<Answers[]>>
  ) {
    try {
      const delectAnswerToQuestionService = new DelectAnswerToQuestionService();
      const delectAnswerToQuestion =
        await delectAnswerToQuestionService.execute(request.body);
      if (delectAnswerToQuestionService) {
        return response
          .status(200)
          .json({ success: true, data: delectAnswerToQuestion });
      }
      return response
        .status(400)
        .json({ success: false, message: "Error! Try Again." });
    } catch (err) {
      return response
        .status(500)
        .json({ success: false, message: err.message });
    }
  }
}
