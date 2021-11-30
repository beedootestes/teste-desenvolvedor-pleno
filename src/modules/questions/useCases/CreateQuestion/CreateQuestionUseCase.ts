import { Question } from "@modules/questions/infra/typeorm/entities/Question";
import { IQuestionsRepository } from "@modules/questions/repositories/IQuestionsRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest {
    title: string;

}

@injectable()
class CreateQuestionUseCase {

    constructor(
        @inject("QuestionsRepository")
        private questionsRepository: IQuestionsRepository
    ) { }

    async execute({ title }: IRequest): Promise<Question> {

        const questionAlreadyExists =  await this.questionsRepository.findByTitle(title);

        if (questionAlreadyExists) {
            throw new AppError("question Already Exists");
        }

        const question = await this.questionsRepository.create({ title });

        return question;


    }

}

export { CreateQuestionUseCase };
