import { injectable, inject } from 'inversify';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import ISentenceRepository from '@modules/sentence/repositories/ISentenceRepository';

interface IRequest {
  sentenceId: number;
}

@injectable()
class DeleteSentenceService {

  constructor(
    @inject(Types.SentenceRepository) private sentenceRepository: ISentenceRepository,
  ) {}

  public async execute({ sentenceId }: IRequest): Promise<boolean> {

    const sentence = await this.sentenceRepository.find({ id: sentenceId, enabled: true });
    if (!sentence) throw new AppError('Sentence does not exist', 404);

    const response = await this.sentenceRepository.deleteLogical(sentence.id);
    if (!response) throw new AppError('Could not delete Sentence', 502);

    return response;
  }
}

export default DeleteSentenceService;
