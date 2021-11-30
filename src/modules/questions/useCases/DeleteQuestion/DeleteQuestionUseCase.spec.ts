import { QuestionsRepositoryInMemory } from "@modules/questions/repositories/in-memory/QuestionsRepositoryInMemory";
import { DeleteQuestionUseCase } from "./DeleteQuestionUseCase";


let questionsRepositoryInMemory: QuestionsRepositoryInMemory;
let deleteQuestion: DeleteQuestionUseCase;

describe('DeleteQuestions', () => {
  beforeEach(() => {
    questionsRepositoryInMemory = new QuestionsRepositoryInMemory();
    deleteQuestion = new DeleteQuestionUseCase(questionsRepositoryInMemory);
  });

  it('should be able to delete question', async () => {

    const questionTest = await questionsRepositoryInMemory.create({ title: 'Question Test' });

    const questionTest2 = await questionsRepositoryInMemory.create({ title: 'Question Test2' });

    const {id} = questionTest;

    await deleteQuestion.execute({ id });

    const questionsList = await questionsRepositoryInMemory.find();

    expect(questionsList).toEqual([questionTest2]);
    expect(questionsList).toHaveLength(1);


  });


});
