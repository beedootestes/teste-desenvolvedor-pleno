import CreateQuestionController from "../controllers/createQuestion.controller";
import { createQuestion } from "../middlewares/createQuestion";
import { Router } from "express";
import ListQuestionsController from "../controllers/listQuestions.controller";
import AlterQuestionController from "../controllers/alterQuestion.controller";
import DelectQuestionController from "../controllers/delectQuestion.controller";
import ListQuestionsDelectedController from "../controllers/questionsDelected.controller";

const routes = Router();

const createQuestionController = new CreateQuestionController();
const listQuestionsController = new ListQuestionsController();
const alterQuestionController = new AlterQuestionController();
const delectQuestionController = new DelectQuestionController();
const listQuestionDelectedsController = new ListQuestionsDelectedController();

routes.post(
  "/questions/create",
  createQuestion,
  createQuestionController.handle
);
routes.put("/questions/alter", alterQuestionController.handle);
routes.get("/questions/list", listQuestionsController.handle);
routes.get("/questions/delecteds", listQuestionDelectedsController.handle);
routes.put("/questions/delect/:idQuestion", delectQuestionController.handle);
export default routes;
