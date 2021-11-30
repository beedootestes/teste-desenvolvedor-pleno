import { AnswersRepositoryInMemory } from "@modules/questions/repositories/in-memory/AnswersRepositoryInMemory";
import { QuestionsRepositoryInMemory } from "@modules/questions/repositories/in-memory/QuestionsRepositoryInMemory";
import { AppError } from "@shared/infra/http/errors/AppError";
import { CreateAnswerUseCase } from "./CreateAnswerController";

let createAnswerUseCase: CreateAnswerUseCase;
let answersRepositoryInMemory: AnswersRepositoryInMemory;
let questionsRepositoryInMemory: QuestionsRepositoryInMemory;

describe("Create Question ", () => {

    beforeEach(() => {
        answersRepositoryInMemory = new (AnswersRepositoryInMemory);
        questionsRepositoryInMemory = new (QuestionsRepositoryInMemory);
        createAnswerUseCase = new CreateAnswerUseCase(answersRepositoryInMemory);
    });

    it("should be able to create a new answer", async () => {

        const question = await questionsRepositoryInMemory.create({ title: 'Question test' });

        const { id } = question;

        const answer = await createAnswerUseCase.execute({
            title: 'Answer Test',
            question_id: id

        });

        const answerCreated = await answersRepositoryInMemory.findById(
            answer.id,

        );

        expect(answerCreated).toHaveProperty("id");

    });

    it("should not be able to create a duplicate answer", () => {
        expect(async () => {
            const question = await questionsRepositoryInMemory.create({ title: 'Question test' });
            
            const { id } = question;

            await createAnswerUseCase.execute({
                title: "string",
                question_id: id

            });

            await createAnswerUseCase.execute({
                title: "string",
                question_id:  id

            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create answer with a inexistant question", () => {
        
        expect(async () => {
            await createAnswerUseCase.execute({
                title: "string",
                question_id: 'id'

            });
        }).rejects.toBeInstanceOf(AppError);

    });

});
