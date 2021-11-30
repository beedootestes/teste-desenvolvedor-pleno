import { AnswersRepositoryInMemory } from "@modules/questions/repositories/in-memory/AnswersRepositoryInMemory";
import { QuestionsRepositoryInMemory } from "@modules/questions/repositories/in-memory/QuestionsRepositoryInMemory";
import { AppError } from "@shared/infra/http/errors/AppError";
import { UpdateAnswerTitleUseCase } from "./UpdateAnswerTitleUseCase";


let questionsRepositoryInMemory: QuestionsRepositoryInMemory;
let answersRepositoryInMemory: AnswersRepositoryInMemory;
let updateAnswerTitleUseCase: UpdateAnswerTitleUseCase;

describe('Update Answer', () => {
  beforeEach(() => {
    questionsRepositoryInMemory = new QuestionsRepositoryInMemory();
    answersRepositoryInMemory = new AnswersRepositoryInMemory();
    updateAnswerTitleUseCase = new UpdateAnswerTitleUseCase(answersRepositoryInMemory);
  });

  it('should be able to update answer title', async () => {

    const question = await questionsRepositoryInMemory.create({ title: 'Question Test' });
    
    const question_id = question.id;

    const answer = await answersRepositoryInMemory.create({ title: 'Answer Test', question_id });

    const title = 'Answer Updated';
    const {id} = answer;

    const updateAnswerTitle = await updateAnswerTitleUseCase.execute({title, id});

    expect(updateAnswerTitle).toHaveProperty('id');
    expect(updateAnswerTitle.title).toEqual('Answer Updated');

  });

  it('should not be able to update a non existant answer', async () => {
    expect(
        updateAnswerTitleUseCase.execute({ title: 'Non existent answer', id: 'dasd' })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update answer whith a title from another', async () => {
    
    const question = await questionsRepositoryInMemory.create({ title: 'Question Test' });

    const title = question.title;
  
    expect(
        updateAnswerTitleUseCase.execute({
        title,
        id: question.id
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
