import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
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

  public async execute({ id }: IRequest): Promise<void> {
    await this.questionsRepository.delete(id);

    return;
  }
}
export{DeleteQuestionUseCase};
