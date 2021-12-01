import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAnswersByQuestionIdUseCase } from "./ListAnswersByQuestionIdUsecase";


class ListAnswersByQuestionIdController {
  async handle(request: Request, response: Response): Promise<Response> {
      const {question_id} = request.params;

      
    const listAnswersByQuestionIdUseCase = container.resolve(
      ListAnswersByQuestionIdUseCase
    );


    const questions = await listAnswersByQuestionIdUseCase.execute(question_id);

    return response.json(questions);
  }
}

export { ListAnswersByQuestionIdController };
