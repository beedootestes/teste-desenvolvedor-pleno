import CreateSentenceService from '@modules/sentence/services/CreateSentenceService';
import ListSentenceService from '@modules/sentence/services/ListSentencesService';

import Container from '@common/container';

let createSentence: CreateSentenceService;
let listAllSentence: ListSentenceService;

describe('ListAllSentence', () => {

  beforeEach(() => {
    createSentence = Container.resolve<CreateSentenceService>(CreateSentenceService);
    listAllSentence = Container.resolve<ListSentenceService>(ListSentenceService);
  });

  it('Should be able to list all Sentences for a filter', async () => {
    const sentence1 = await createSentence.execute({
      data: {
        question: 1,
        text: 'Olá',
        type: 'ANSWER',
      },
    });

    const sentence2 = await createSentence.execute({
      data: {
        question: 1,
        text: 'Olá',
        type: 'ANSWER',
      },
    });

    const sentences = await listAllSentence.execute({
      data: {
        filter: {
          id: sentence1.id,
        },
      },
    });

    const sentencesPks = sentences.results.map((each) => each.sentence.id);

    expect(sentencesPks).toContainEqual(sentence1.id);
    expect(sentencesPks).not.toContainEqual(sentence2.id);

  }, 50000);
});
