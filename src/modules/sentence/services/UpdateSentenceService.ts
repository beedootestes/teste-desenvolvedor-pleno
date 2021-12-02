import { injectable, inject } from 'inversify';
import * as Z from 'zod';

import Sentence from '@entities/Sentence';
import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import ISentenceRepository from '@modules/sentence/repositories/ISentenceRepository';
import UpdateSentenceValidator from '@modules/sentence/infra/http/validators/UpdateSentenceValidator';

interface IRequest {
  sentenceId: number;
  data: Z.infer<typeof UpdateSentenceValidator>;
}

@injectable()
class UpdateSentenceService {

  constructor(
    @inject(Types.SentenceRepository) private SentenceRepository: ISentenceRepository,
  ) {}

  public async execute({ sentenceId, data }: IRequest): Promise<Sentence> {

    const sentence = await this.SentenceRepository.find({ id: sentenceId, enabled: true });
    if (!sentence) throw new AppError('Sentence does not exist', 404);

    return this.SentenceRepository.update(sentence, data);
  }
}

export default UpdateSentenceService;
