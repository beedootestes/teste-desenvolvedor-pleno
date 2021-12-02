import { injectable, inject } from 'inversify';
import * as Z from 'zod';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import ISentenceRepository from '@modules/sentence/repositories/ISentenceRepository';

// validator
import ListSentenceSchema from '@modules/sentence/infra/http/validators/ListSentenceValidator';

// response interface
import IResponse from '@modules/sentence/responses/IListSentenceResponse';

interface IRequest {
  data: Z.infer<typeof ListSentenceSchema>;
}

@injectable()
class ListSentenceService {

  constructor(
    @inject(Types.SentenceRepository) private sentenceRepository: ISentenceRepository,
  ) {}

  public async execute({ data }:IRequest): Promise<IResponse> {

    const { filter, pageSize, pageOffSet, pageCount } = data;

    const sentences = await this.sentenceRepository.filter({
      where: filter,
      page: { size: pageSize, count: pageCount, offset: pageOffSet },
    });

    if (!sentences) throw new AppError('Could not find any Sentences', 404);

    const results = sentences.map((sentence, i) => {
      const index = {
        page: Math.trunc((i / (pageSize || 30)) + (pageOffSet || 0)),
        index: (i % (pageSize || 30)),
      };

      const snt = {
        id: sentence.id,
        question: sentence.question,
        text: sentence.text,
        type: sentence.type,
        enabled: sentence.enabled,
      };

      return { index, sentence: snt };
    });

    const response: IResponse = {
      pageSize: pageSize || 0,
      totalItems: results.length,
      results,
    };

    return response;
  }
}

export default ListSentenceService;
