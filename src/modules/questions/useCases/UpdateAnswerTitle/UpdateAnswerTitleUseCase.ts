import { Question } from '@modules/questions/infra/typeorm/entities/Question';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { AppError } from '@shared/infra/http/errors/AppError';
import { injectable, inject } from 'tsyringe';

interface IRequest {
    title: string;
    id: string;
}

@injectable()
class UpdateAnswerTitleUseCase {
    constructor(
        @inject('AnswersRepository')
        private answersRepository: IAnswersRepository

    ) {}

    public async execute({ id, title }: IRequest): Promise<Question> {
        const answer = await this.answersRepository.findById(id);

        if (!answer) {
            throw new AppError('answer not found');
        }

        const {question_id} = answer;

        const answerWithUpdatedTitle = await this.answersRepository.findResgistredAnswerByQuestionId(title, question_id);

        if (answerWithUpdatedTitle) {
            throw new AppError('Question already in use.');
        }

        answer.title = title;

        return this.answersRepository.save(answer);
    }
}

export  {UpdateAnswerTitleUseCase};
