import { AnswersRepositoryInMemory } from "@modules/repositories/in-memory/AnswersRepositoryInMemory";
import { QuestionsRepositoryInMemory } from "@modules/repositories/in-memory/QuestionsRepositoryInMemory";
import { AppError } from "@shared/infra/http/errors/AppError";
import { DeleteAnswerUseCase } from "./DeleteAnswerUseCase";


let questionsRepositoryInMemory: QuestionsRepositoryInMemory;
let answersRepositoryInMemory: AnswersRepositoryInMemory;
let deleteAnswer: DeleteAnswerUseCase;

describe('DeleteAnswers', () => {
  beforeEach(() => {
    questionsRepositoryInMemory = new QuestionsRepositoryInMemory();
    answersRepositoryInMemory = new AnswersRepositoryInMemory();
    deleteAnswer = new DeleteAnswerUseCase(answersRepositoryInMemory);
  });

  it('should be able to delete answer', async () => {

    const question = await questionsRepositoryInMemory.create({ title: 'Question Test' });
    
    const question_id = question.id;

    const answer = await answersRepositoryInMemory.create({ title: 'Answer Test', question_id });
  
    const answer2 = await answersRepositoryInMemory.create({ title: 'Answer Test2', question_id });


    const {id} = answer;

    await deleteAnswer.execute({ id });

    const answersList = await answersRepositoryInMemory.find();

    expect(answersList).toEqual([answer2]);
    expect(answersList).toHaveLength(1);

  });

  it('should not be able to delete a inexistent answer', async () => {
    expect(async () => {
        await deleteAnswer.execute({
            id: 'dasdasdsadas'

        });
    }).rejects.toBeInstanceOf(AppError);

  });


});
