import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { AppError } from '@shared/infra/http/errors/AppError';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
class DeleteQuestionUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void | AppError> {

    const questionExists = await this.questionsRepository.findById(id);

    if(!questionExists) {
        return new AppError("Question not exists!");
    }


    await this.questionsRepository.delete(id);

    return;
  }
}
export{DeleteQuestionUseCase};
