import { Router } from "express";
import { createAnswers } from "../middlewares/createAnswers";
import { delectAnswerOption } from "../middlewares/delectAnswerOption";
import CreateAnswersController from "../controllers/answersControllers/createAnswers.controller";
import ListAnswersToQuestionController from "../controllers/answersControllers/listAnswersToQuestion.controller";
import AlterAnswerOptionToQuestionController from "../controllers/answersControllers/alterAnswerOptionToQuestion.controller";
import DelectAnswerToQuestionController from "../controllers/answersControllers/delectAnswerQuestion.controller";
import ListAllQuestionsWithAnswerOptionController from "../controllers/answersControllers/listAllQuestionsWithAnswerOption.controller";

const routes = Router();

const createAnswersControllers = new CreateAnswersController();
const listAnswersToQuestionController = new ListAnswersToQuestionController();
const alterAnswerToQuestionController =
  new AlterAnswerOptionToQuestionController();
const delectAnswerToQuestionController = new DelectAnswerToQuestionController();
const listAllQuestionWithAnswersController =
  new ListAllQuestionsWithAnswerOptionController();

routes.post("/answers/create", createAnswers, createAnswersControllers.handle);
routes.get(
  "/answers/listAnswersToQuestion/:idQuestion",
  listAnswersToQuestionController.handle
);
routes.put("/answers/alter", alterAnswerToQuestionController.handle);
routes.delete(
  "/answers/delectOptionAnswerToQestion",
  delectAnswerOption,
  delectAnswerToQuestionController.hanle
);
routes.get("/answers/listAll", listAllQuestionWithAnswersController.handle);

export default routes;
