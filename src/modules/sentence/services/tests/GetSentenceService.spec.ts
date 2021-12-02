import CreateSentenceService from '@modules/sentence/services/CreateSentenceService';
import GetSentenceByIdService from '@modules/sentence/services/GetSentenceByIdService';

import Container from '@common/container';

let createSentence: CreateSentenceService;
let getSentence: GetSentenceByIdService;

describe('GetSentence', () => {

  beforeEach(() => {
    createSentence = Container.resolve<CreateSentenceService>(CreateSentenceService);
    getSentence = Container.resolve<GetSentenceByIdService>(GetSentenceByIdService);
  });

  it('Should be able to find a Sentence', async () => {
    const sentenceRecord = await createSentence.execute({
      data: {
        question: 1,
        text: 'Olá',
        type: 'ANSWER',
      },
    });

    const sentence = await getSentence.execute({
      sentenceId: sentenceRecord.id,
    });

    expect(sentence).toHaveProperty('id');

  }, 30000);
});
