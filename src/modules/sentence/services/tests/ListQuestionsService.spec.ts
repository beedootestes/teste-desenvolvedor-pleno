import CreateSentenceService from '@modules/sentence/services/CreateSentenceService';
import ListQuestionsService from '@modules/sentence/services/ListQuestionsService';

import Container from '@common/container';

let createSentence: CreateSentenceService;
let listQuestions: ListQuestionsService;

describe('ListAllSentence', () => {

  beforeEach(() => {
    createSentence = Container.resolve<CreateSentenceService>(CreateSentenceService);
    listQuestions = Container.resolve<ListQuestionsService>(ListQuestionsService);
  });

  it('Should be able to list all Sentences for a filter', async () => {
    const qst = await createSentence.execute({
      data: {
        text: 'Vamos?',
        type: 'QUESTION',
      },
    });

    const ans = await createSentence.execute({
      data: {
        question: qst.id,
        text: 'Bora!',
        type: 'ANSWER',
      },
    });

    const questions = await listQuestions.execute();

    let answersPks = [];
    const questionsPks = questions.questions.map((each) => {
      answersPks = each.answers.map((a) => a.id);
      return each.id;
    });

    expect(questionsPks).toContainEqual(qst.id);
    expect(answersPks).toContainEqual(ans.id);

  }, 50000);
});
