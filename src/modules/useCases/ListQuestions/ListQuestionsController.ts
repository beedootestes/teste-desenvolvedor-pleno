import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListQuestionsUseCase } from "./ListQuestionsUseCase";

class ListQuestionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listQuestionsUseCase = container.resolve(
      ListQuestionsUseCase
    );

    const questions = await listQuestionsUseCase.execute();

    return response.json(questions);
  }
}

export { ListQuestionsController };
