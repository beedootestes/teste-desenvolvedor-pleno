import { Question } from '@modules/questions/infra/typeorm/entities/Question';
import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { AppError } from '@shared/infra/http/errors/AppError';
import { injectable, inject } from 'tsyringe';

interface IRequest {
    title: string;
    id: string;

}

@injectable()
class UpdateQuestionTitleUseCase {
    constructor(
        @inject('QuestionsRepository')
        private questionsRepository: IQuestionsRepository

    ) { }

    public async execute({ id, title }: IRequest): Promise<Question> {
        const question = await this.questionsRepository.findById(id);

        if (!question) {
            throw new AppError('question not found');
        }

        const questionWithUpdatedTitle = await this.questionsRepository.findByTitle(title);

        if (questionWithUpdatedTitle && questionWithUpdatedTitle.id !== id) {
            throw new AppError('Question already in use.');
        }

        question.title = title;

        return this.questionsRepository.save(question);
    }
}

export default UpdateQuestionTitleUseCase;
