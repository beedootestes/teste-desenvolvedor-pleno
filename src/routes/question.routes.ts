import { Router } from "express";
import { createQuestion } from "../middlewares/createQuestion";
import ListQuestionsController from "../controllers/questionsControllers/listQuestions.controller";
import AlterQuestionController from "../controllers/questionsControllers/alterQuestion.controller";
import DelectQuestionController from "../controllers/questionsControllers/delectQuestion.controller";
import CreateQuestionController from "../controllers/questionsControllers/createQuestion.controller";
import ListQuestionsDelectedController from "../controllers/questionsControllers/questionsDelected.controller";

const routes = Router();

const listQuestionsController = new ListQuestionsController();
const alterQuestionController = new AlterQuestionController();
const createQuestionController = new CreateQuestionController();
const delectQuestionController = new DelectQuestionController();
const listQuestionDelectedsController = new ListQuestionsDelectedController();

routes.post(
  "/questions/create",
  createQuestion,
  createQuestionController.handle
);
routes.get("/questions/list", listQuestionsController.handle);
routes.put("/questions/alter", alterQuestionController.handle);
routes.get("/questions/delecteds", listQuestionDelectedsController.handle);
routes.put("/questions/delect/:idQuestion", delectQuestionController.handle);

export default routes;
