import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { AppError } from '@shared/infra/http/errors/AppError';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
class DeleteAnswerUseCase {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void | AppError> {

    const answerExists = await this.answersRepository.findById(id);

    if(!answerExists) {
        return new AppError("Answer not exists!");
    }
    
    await this.answersRepository.delete(id);

    return;
  }
}
export{DeleteAnswerUseCase};
