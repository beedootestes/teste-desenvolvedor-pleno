import { Question } from "@modules/infra/typeorm/entities/Question";
import { IAnswersRepository } from "@modules/repositories/IAnswersRepository";
import { IQuestionsRepository } from "@modules/repositories/IQuestionsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListQuestionsUseCase {
    constructor(
        @inject("QuestionsRepository")
        private questionsRepository: IQuestionsRepository,

        @inject("AnswersRepository")
        private answersRepository: IAnswersRepository
    ) { }

    async execute(): Promise<Question[] | any> {
        const questions = [];

        const listQuestions = await this.questionsRepository.find();

        console.clear();

        for (const questionList of listQuestions) {
            const { id } = questionList;

            const answers = await this.answersRepository.findByQuestionId(id)

            const questionListWithAnswers = {
                ...questionList,
                answers
            }


            questions.push(questionListWithAnswers);
        }



        return questions;
    }
}

export { ListQuestionsUseCase };
