import { injectable, inject } from 'inversify';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import ISentenceRepository from '@modules/sentence/repositories/ISentenceRepository';

interface IRequest {
  sentenceId: number;
}

@injectable()
class ReactiveSentenceService {

  constructor(
    @inject(Types.SentenceRepository) private sentenceRepository: ISentenceRepository,
  ) {}

  public async execute({ sentenceId }: IRequest): Promise<void> {

    const sentence = await this.sentenceRepository.find({ id: sentenceId });
    if (!sentence) throw new AppError('Sentence does not exist', 404);

    const response = await this.sentenceRepository.update(sentence, { enabled: true });
    if (!response) throw new AppError('Could not delete Sentence', 502);
  }
}

export default ReactiveSentenceService;
