import { QuestionsRepositoryInMemory } from "@modules/repositories/in-memory/QuestionsRepositoryInMemory";
import { AppError } from "@shared/infra/http/errors/AppError";
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

    expect(questionsList).toEqual([{...questionTest2, answers: []}]);
    expect(questionsList).toHaveLength(1);

  });

  it('should not be able to delete a inexistent question', async () => {
    expect(async () => {
        await deleteQuestion.execute({
            id: 'dasdasdsadas'

        });
    }).rejects.toBeInstanceOf(AppError);

  });


});
