import { Answer } from '@modules/questions/infra/typeorm/entities/Answers';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { injectable, inject } from 'tsyringe';


interface IRequest {
  question_id: string;
  title: string;
}

@injectable()
class CreateAnswerUseCase {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository
 
  ) {}

  public async execute({ question_id, title }: IRequest): Promise<Answer> {

    const answer = await this.answersRepository.create({
      question_id,
      title,
    });


    await this.answersRepository.save(answer);

    return answer;
  }
}

export {CreateAnswerUseCase};
