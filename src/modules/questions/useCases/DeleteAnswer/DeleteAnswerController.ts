import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteAnswerUseCase } from "./DeleteAnswerUseCase";


class DeleteAnswerController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteAnswerUseCase = container.resolve(DeleteAnswerUseCase);

        await deleteAnswerUseCase.execute({ id });

        return response.status(200).json();
    }
}

export { DeleteAnswerController };
