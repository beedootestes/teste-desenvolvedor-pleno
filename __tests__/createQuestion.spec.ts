import QuestioService from "@services/Question.service";

describe("Create Question", () => {
  it("New Question", async () => {
    const questioService = new QuestionService();
    const save = await questioService.handle({
      question: "O teste Passou?",
      status: "Active",
    });
    expect(save).toHaveProperty("id");
  });
});
