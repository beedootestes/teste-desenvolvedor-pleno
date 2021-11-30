import { QuestionsRepositoryInMemory } from "@modules/questions/repositories/in-memory/QuestionsRepositoryInMemory";
import { AppError } from "@shared/infra/http/errors/AppError";
import UpdateQuestionService from "./UpdateQuestionTitleUseCase";


let questionsRepositoryInMemory: QuestionsRepositoryInMemory;
let updateQuestion: UpdateQuestionService;

describe('Update Question', () => {
  beforeEach(() => {
    questionsRepositoryInMemory = new QuestionsRepositoryInMemory();
    updateQuestion = new UpdateQuestionService(questionsRepositoryInMemory);
  });

  it('should be able to update question title', async () => {

    const question = await questionsRepositoryInMemory.create({ title: 'Question Test' });

    const title = 'Question Updated';
    const id = question.id;


    const updateQuestionService = await updateQuestion.execute({title, id});

    // const findUser = await getUserById.execute({ user_id });

    expect(updateQuestionService).toHaveProperty('id');
  });

  it('should not be able to update a non existant user', async () => {
    expect(
        updateQuestion.execute({ title: 'Non existent question', id: 'dasd' })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user whith a email from another', async () => {
    
    const question = await questionsRepositoryInMemory.create({ title: 'Question Test' });

    const title = question.title;
  

    // const findUser = await getUserById.execute({ user_id });

    expect(
        updateQuestion.execute({
        title,
        id: 'dasd'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
