import { Answer } from "@modules/questions/infra/typeorm/entities/Answers";
import { IAnswersRepository } from "@modules/questions/repositories/IAnswersRepository";
import { IQuestionsRepository } from "@modules/questions/repositories/IQuestionsRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest {
    title: string;
    question_id: string;
}

@injectable()
class CreateAnswerUseCase {
    
    constructor(
        @inject("AnswersRepository")
        private answersRepository: IAnswersRepository,
        @inject("QuestionsRepository")
        private questionsRepository: IQuestionsRepository
    ) { }

    async execute({ title, question_id }: IRequest): Promise<Answer> {

        const verifyQuestionId = await this.questionsRepository.findById(question_id)
        
        if (!verifyQuestionId) {
            throw new AppError("question not exists");
        }
        
        const findResgistredAnswerByQuestionId =  await this.answersRepository.findResgistredAnswerByQuestionId(title, question_id);
        
        if (findResgistredAnswerByQuestionId) {
            throw new AppError("answer Already exists");
        }


        const question = await this.answersRepository.create({ title, question_id });

        return question;


    }

}

export { CreateAnswerUseCase };
