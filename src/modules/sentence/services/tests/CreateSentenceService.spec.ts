import CreateSentenceService from '@modules/sentence/services/CreateSentenceService';

import Container from '@common/container';

let createSentence: CreateSentenceService;

describe('CreateSentence', () => {

  beforeEach(async () => {
    createSentence = Container.resolve<CreateSentenceService>(CreateSentenceService);
  });

  it('Should be able to create a new Sentence', async () => {

    const sentence = await createSentence.execute({
      data: {
        question: 1,
        text: 'Olá',
        type: 'ANSWER',
      },
    });

    expect(sentence).toHaveProperty('id');

  }, 30000);
});
