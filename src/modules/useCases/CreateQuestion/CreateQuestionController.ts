import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateQuestionUseCase } from "./CreateQuestionUseCase";


class CreateQuestionController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { title } = request.body;

        const createQuestionUseCase = container.resolve(CreateQuestionUseCase);
        
        await createQuestionUseCase.execute({ title });

        return response.status(201).json();
    }

}

export {CreateQuestionController};
