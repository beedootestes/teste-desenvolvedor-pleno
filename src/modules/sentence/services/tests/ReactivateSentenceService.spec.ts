import CreateSentenceService from '@modules/sentence/services/CreateSentenceService';
import ReactivateSentenceService from '@modules/sentence/services/ReactivateSentenceService';
import GetSentenceByIdService from '@modules/sentence/services/GetSentenceByIdService';
import DeleteSentenceService from '@modules/sentence/services/DeleteSentenceService';

import Container from '@common/container';

let createSentence: CreateSentenceService;
let deleteSentence: DeleteSentenceService;
let reactivateSentence: ReactivateSentenceService;
let getSentence: GetSentenceByIdService;

describe('reactivateSentence', () => {

  beforeEach(() => {
    createSentence = Container.resolve<CreateSentenceService>(CreateSentenceService);
    getSentence = Container.resolve<GetSentenceByIdService>(GetSentenceByIdService);
    reactivateSentence = Container.resolve<ReactivateSentenceService>(ReactivateSentenceService);
    deleteSentence = Container.resolve<DeleteSentenceService>(DeleteSentenceService);
  });

  it('Should be able to reactivate a Sentence', async () => {
    const sentenceRecord = await createSentence.execute({
      data: {
        text: 'Tudo bem?',
        type: 'QUESTION',
      },
    });

    await deleteSentence.execute({
      sentenceId: sentenceRecord.id,
    });

    await reactivateSentence.execute({
      sentenceId: sentenceRecord.id,
    });

    const sentence = await getSentence.execute({
      sentenceId: sentenceRecord.id,
    });

    expect(sentence).toHaveProperty('id');

  }, 30000);
});
