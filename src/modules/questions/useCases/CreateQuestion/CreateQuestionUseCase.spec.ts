import { QuestionsRepositoryInMemory } from "@modules/questions/repositories/in-memory/QuestionsRepositoryInMemory";
import { AppError } from "@shared/infra/http/errors/AppError";
import { CreateQuestionUseCase } from "./CreateQuestionUseCase";

let createQuestionUseCase: CreateQuestionUseCase;
let questionsRepositoryInMemory: QuestionsRepositoryInMemory;


describe("Create Question ", () => {

    beforeEach(() => {
        questionsRepositoryInMemory = new (QuestionsRepositoryInMemory);
        createQuestionUseCase = new CreateQuestionUseCase(questionsRepositoryInMemory);
    });

    it("should be able to create a new question", async () => {
        const title = "string";

        const question = await createQuestionUseCase.execute({
           title

        });

        const questionCreated = await questionsRepositoryInMemory.findByTitle(
            question.title
           );

        console.log(question);

        expect(questionCreated).toHaveProperty("id");

    });

    it("should not be able to create a duplicate question", () => {
        expect(async () => {
            await createQuestionUseCase.execute({
                title: "string",
    
            });

            await createQuestionUseCase.execute({
                title: "string",
    
            });
        }).rejects.toBeInstanceOf(AppError);
    });        


});
