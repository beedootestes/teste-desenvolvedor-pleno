import { injectable, inject } from 'inversify';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import ISentenceRepository from '@modules/sentence/repositories/ISentenceRepository';

// response interface
import IResponse from '@modules/sentence/responses/IListQuestionsResponse';

@injectable()
class ListQuestionsService {

  constructor(
    @inject(Types.SentenceRepository) private sentenceRepository: ISentenceRepository,
  ) {}

  public async execute(): Promise<IResponse> {

    const sentences = await this.sentenceRepository.filter({ where: { type: 'QUESTION' } });
    if (!sentences) throw new AppError('Could not find any Sentences', 404);

    const questions = await Promise.all(sentences.map(async (sentence) => {
      const answers = await this.sentenceRepository.filter({ where: { type: 'ANSWER', question: sentence.id } });
      return {
        id: sentence.id,
        text: sentence.text,
        answers: answers ? answers.map((ans) => ({ id: ans.id, text: ans.text })) : null,
      };
    }));

    return { questions };
  }
}

export default ListQuestionsService;
