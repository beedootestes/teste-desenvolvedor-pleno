import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateQuestionTitleUseCase from "./UpdateQuestionTitleUseCase";


class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { title } = request.body;


        const updateQuestionTitleUseCase = container.resolve(UpdateQuestionTitleUseCase);

        const question = await updateQuestionTitleUseCase.execute({
            title,
            id
        });

        return response.json(question);
    }
}

export { ListAvailableCarsController };
