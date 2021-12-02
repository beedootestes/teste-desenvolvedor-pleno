import CreateSentenceService from '@modules/sentence/services/CreateSentenceService';
import DeleteSentenceService from '@modules/sentence/services/DeleteSentenceService';

import Container from '@common/container';

let createSentence: CreateSentenceService;
let deleteSentence: DeleteSentenceService;

describe('DeleteSentence', () => {

  beforeEach(() => {
    createSentence = Container.resolve<CreateSentenceService>(CreateSentenceService);
    deleteSentence = Container.resolve<DeleteSentenceService>(DeleteSentenceService);
  });

  it('Should be able to delete a Sentence', async () => {

    const sentenceRecord = await createSentence.execute({
      data: {
        text: 'Tude bem?',
        type: 'QUESTION',
      },
    });

    const res = await deleteSentence.execute({
      sentenceId: sentenceRecord.id,
    });

    expect(res).toBe(true);

  }, 30000);
});
