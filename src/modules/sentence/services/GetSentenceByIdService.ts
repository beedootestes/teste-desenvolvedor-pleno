import { injectable, inject } from 'inversify';

import Sentence from '@entities/Sentence';
import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import ISentenceRepository from '@modules/sentence/repositories/ISentenceRepository';

interface IRequest {
  sentenceId: number;
}

@injectable()
class GetSentenceByIdService {

  constructor(
    @inject(Types.SentenceRepository) private sentenceRepository: ISentenceRepository,
  ) {}

  public async execute({ sentenceId }: IRequest): Promise<Sentence> {

    const sentence = await this.sentenceRepository.find({ id: sentenceId, enabled: true });
    if (!sentence) throw new AppError('Sentence does not exist', 404);

    return sentence;
  }
}

export default GetSentenceByIdService;
