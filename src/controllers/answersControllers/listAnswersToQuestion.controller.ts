import { AppResponse } from "../../@types";
import { Request, Response } from "express";
import { Answers } from "../../models/Answers";
import { ICreateAnswers } from "../../services/answersServices/createAnswers.service";
import GetAnswerToQuestionService from "../../services/answersServices/getAnswerToQuestion.service";

export default class ListAnswersToQuestionController {
  async handle(
    request: Request<ICreateAnswers>,
    response: Response<AppResponse<Answers[]>>
  ) {
    try {
      const idQuestion = request.params;
      const getAnswersToQuestionsController = new GetAnswerToQuestionService();
      const listAnswersToQuestion =
        await getAnswersToQuestionsController.execute(idQuestion);
      if (listAnswersToQuestion) {
        return response
          .status(200)
          .json({ success: true, data: listAnswersToQuestion });
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
