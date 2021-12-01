import { AnswersRepositoryInMemory } from "@modules/repositories/in-memory/AnswersRepositoryInMemory";
import { QuestionsRepositoryInMemory } from "@modules/repositories/in-memory/QuestionsRepositoryInMemory";
import { ListQuestionsUseCase } from "./ListQuestionsUseCase";


let listQuestionsUseCase: ListQuestionsUseCase;
let questionsRepositoryInMemory: QuestionsRepositoryInMemory;
let answersRepositoryInMemory: AnswersRepositoryInMemory;


describe("List Questions", () => {
  beforeEach(() => {
    questionsRepositoryInMemory = new QuestionsRepositoryInMemory();
    answersRepositoryInMemory = new AnswersRepositoryInMemory();
    listQuestionsUseCase = new ListQuestionsUseCase(
        questionsRepositoryInMemory,
        answersRepositoryInMemory
        
    );
  });

  it("should be able to list all questions", async () => {

    
    await questionsRepositoryInMemory.create({title: 'Question test'});

    const question = await questionsRepositoryInMemory.create({title: 'Question test 2'});

    const question_id = question.id;


    const answer = await answersRepositoryInMemory.create({ title: 'Answer Test', question_id });

    const findQuestions = await listQuestionsUseCase.execute();


    expect(findQuestions).toHaveLength(2);
  });

 
});
