import CreateQuestionService from "../src/services/questionsServices/createQuestion.service";

describe("Create Question", () => {
  it("New Question", async () => {
    const questioService = new CreateQuestionService();
    const save = await questioService.execute({
      question: "O teste?",
      description: "teste teste teste teste",
    });
    expect(save).toHaveProperty("id");
    expect(save.question).toBe("O teste?");
  });
});
