import { injectable, inject } from 'inversify';
import * as Z from 'zod';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import Sentence from '@entities/Sentence';

import ISentenceRepository from '@modules/sentence/repositories/ISentenceRepository';
import CreateSentenceValidator from '@modules/sentence/infra/http/validators/CreateSentenceValidator';

interface IRequest {
  data: Z.infer<typeof CreateSentenceValidator>;
}

@injectable()
class CreateSentenceService {

  constructor(
    @inject(Types.SentenceRepository) private sentenceRepository: ISentenceRepository,
  ) {}

  public async execute({ data }: IRequest): Promise<Sentence> {

    if (data.question) {
      const sentence = await this.sentenceRepository.find({ id: data.question, enabled: true });
      if (!sentence) throw new AppError('Sentence does not exist', 404);
    }

    return this.sentenceRepository.create({ question: data.question, text: data.text, type: data.type });
  }
}

export default CreateSentenceService;
