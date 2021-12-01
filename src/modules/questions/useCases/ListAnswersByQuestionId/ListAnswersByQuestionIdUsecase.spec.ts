import { AnswersRepositoryInMemory } from "@modules/questions/repositories/in-memory/AnswersRepositoryInMemory";
import { QuestionsRepositoryInMemory } from "@modules/questions/repositories/in-memory/QuestionsRepositoryInMemory";
import { AppError } from "@shared/infra/http/errors/AppError";
import { ListAnswersByQuestionIdUseCase } from "./ListAnswersByQuestionIdUsecase";


let listAnswersByQuestionIdUseCase: ListAnswersByQuestionIdUseCase;
let questionsRepositoryInMemory: QuestionsRepositoryInMemory;
let answersRepositoryInMemory: AnswersRepositoryInMemory;

describe("List Answers by question_id", () => {
    beforeEach(() => {
        questionsRepositoryInMemory = new QuestionsRepositoryInMemory();
        answersRepositoryInMemory = new AnswersRepositoryInMemory();
        listAnswersByQuestionIdUseCase = new ListAnswersByQuestionIdUseCase(
            answersRepositoryInMemory
        );
    });

    it("should be able to list all answers by question_id", async () => {

        const question = await questionsRepositoryInMemory.create({ title: 'Question test' });

        const question_id = question.id;

        await answersRepositoryInMemory.create({
            title: 'Answer Test',
            question_id

        });

        await answersRepositoryInMemory.create({
            title: 'Answer Test2',
            question_id

        });

        const findAnswers = await listAnswersByQuestionIdUseCase.execute(question_id);

        expect(findAnswers).toHaveLength(2);
    });

    it('should not be able to list a inexistent answer', async () => {
        expect(async () => {
            const question_id = 't';

            await listAnswersByQuestionIdUseCase.execute(
                question_id 
            );
        }).rejects.toBeInstanceOf(AppError);
    
      });


});
