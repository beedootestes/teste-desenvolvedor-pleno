import { Request, Response } from "express";
import { container } from "tsyringe";
import {UpdateAnswerTitleUseCase} from "./UpdateAnswerTitleUseCase";


class UpdateAnswerTitleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { title } = request.body;


        const updateAnswerTitleUseCase = container.resolve(UpdateAnswerTitleUseCase);

        const question = await updateAnswerTitleUseCase.execute({
            id,
            title
        });

        return response.json(question);
    }
}

export { UpdateAnswerTitleController };
