import CreateQuestionController from "../controllers/createQuestion.controller";
import { createQuestion } from "../middlewares/createQuestion";
import { Router } from "express";
import ListQuestionsController from "../controllers/listQuestions.controller";

const routes = Router();

const createQuestionController = new CreateQuestionController();
const listQuestionsController = new ListQuestionsController();

routes.post(
  "/questions/create",
  createQuestion,
  createQuestionController.handle
);
routes.get("/questions/list", listQuestionsController.handle);
export default routes;
