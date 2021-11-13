import CreateQuestionController from "../controllers/createQuestion.controller";
import { createQuestion } from "../middlewares/createQuestion";
import { Router } from "express";
import ListQuestionsController from "../controllers/listQuestions.controller";
import AlterQuestionController from "../controllers/alterQuestion.controller";

const routes = Router();

const createQuestionController = new CreateQuestionController();
const listQuestionsController = new ListQuestionsController();
const alterQuestionController = new AlterQuestionController();

routes.post(
  "/questions/create",
  createQuestion,
  createQuestionController.handle
);
routes.post("/questions/alter", alterQuestionController.handle);
routes.get("/questions/list", listQuestionsController.handle);
export default routes;
