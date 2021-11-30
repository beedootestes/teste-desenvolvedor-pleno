import { QuestionsRepositoryInMemory } from "@modules/questions/repositories/in-memory/QuestionsRepositoryInMemory";
import { AppError } from "@shared/infra/http/errors/AppError";
import UpdateQuestionTitleUseCase from "./UpdateQuestionTitleUseCase";


let questionsRepositoryInMemory: QuestionsRepositoryInMemory;
let updateQuestionTitleUseCase: UpdateQuestionTitleUseCase;

describe('Update Question', () => {
  beforeEach(() => {
    questionsRepositoryInMemory = new QuestionsRepositoryInMemory();
    updateQuestionTitleUseCase = new UpdateQuestionTitleUseCase(questionsRepositoryInMemory);
  });

  it('should be able to update question title', async () => {

    const question = await questionsRepositoryInMemory.create({ title: 'Question Test' });

    const title = 'Question Updated';
    const id = question.id;


    const updateQuestion = await updateQuestionTitleUseCase.execute({title, id});

    expect(updateQuestion).toHaveProperty('id');
  });

  it('should not be able to update a non existant question', async () => {
    expect(
        updateQuestionTitleUseCase.execute({ title: 'Non existent question', id: 'dasd' })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update question whith a email from another', async () => {
    
    const question = await questionsRepositoryInMemory.create({ title: 'Question Test' });

    const title = question.title;
  
    expect(
        updateQuestionTitleUseCase.execute({
        title,
        id: 'dasd'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
