import CreateSentenceService from '@modules/sentence/services/CreateSentenceService';
import UpdateSentenceService from '@modules/sentence/services/UpdateSentenceService';
import GetSentenceByIdService from '@modules/sentence/services/GetSentenceByIdService';

import Container from '@common/container';

let createSentence: CreateSentenceService;
let updateSentence: UpdateSentenceService;
let getSentence: GetSentenceByIdService;

describe('UpdateSentence', () => {

  beforeEach(() => {
    createSentence = Container.resolve<CreateSentenceService>(CreateSentenceService);
    getSentence = Container.resolve<GetSentenceByIdService>(GetSentenceByIdService);
    updateSentence = Container.resolve<UpdateSentenceService>(UpdateSentenceService);
  });

  it('Should be able to update a Sentence', async () => {
    const sentenceRecord = await createSentence.execute({
      data: {
        text: 'Tudo bem?',
        type: 'QUESTION',
      },
    });

    await updateSentence.execute({
      sentenceId: sentenceRecord.id,
      data: {
        text: 'Ok!',
      },
    });

    const sentence = await getSentence.execute({
      sentenceId: sentenceRecord.id,
    });

    expect(sentence.text).toStrictEqual('Ok!');

  }, 30000);
});
