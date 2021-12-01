import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAnswerUseCase } from "./CreateAnswerUseCase";


class CreateAnswerController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { title } = request.body;
        const {question_id} = request.params;

        const createAnswerUseCase = container.resolve(CreateAnswerUseCase);
        
        await createAnswerUseCase.execute({ title, question_id });

        return response.status(201).json();
    }

}

export {CreateAnswerController};
