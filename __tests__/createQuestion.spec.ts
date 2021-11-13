import QuestionService from "../src/services/createQuestion.service";
import QuestionsRepository from "../src/repositories/question.repository";
import { getCustomRepository } from "typeorm";

describe("Create Question", () => {
  it("New Question", async () => {
    const questioService = new QuestionService();
    const save = await questioService.execute({
      question: "O teste Passou?",
      description: "teste",
    });
    expect(save).toHaveProperty("id");
    expect(save.question).toBe("O teste Passou?");
  });
});
