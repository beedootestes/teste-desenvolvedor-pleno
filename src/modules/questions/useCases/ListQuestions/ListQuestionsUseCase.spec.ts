import { QuestionsRepositoryInMemory } from "@modules/questions/repositories/in-memory/QuestionsRepositoryInMemory";
import { ListQuestionsUseCase } from "./ListQuestionsUseCase";


let listQuestionsUseCase: ListQuestionsUseCase;
let questionsRepositoryInMemory: QuestionsRepositoryInMemory;

describe("List Questions", () => {
  beforeEach(() => {
    questionsRepositoryInMemory = new QuestionsRepositoryInMemory();
    listQuestionsUseCase = new ListQuestionsUseCase(
        questionsRepositoryInMemory
    );
  });

  it("should be able to list all questions", async () => {

    
    await questionsRepositoryInMemory.create({title: 'Question test'});

    await questionsRepositoryInMemory.create({title: 'Question test 2'});


    const findQuestions = await listQuestionsUseCase.execute();

    expect(findQuestions).toHaveLength(2);
  });

 
});
