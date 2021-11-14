import { AppResponse } from "../@types";
import { Request, Response } from "express";
import DelectQuestionService, {
  IDelectQuestion,
} from "../services/delectQuestion.service";

export default class DelectQuestionController {
  async handle(
    request: Request<IDelectQuestion>,
    response: Response<AppResponse<string>>
  ) {
    try {
      const idQuestion = request.params;
      const delectQuestionService = new DelectQuestionService();
      const delect = await delectQuestionService.execute(idQuestion);
      console.log(delect);

      if (delect) {
        return response.status(200).json({ success: true, data: delect });
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
