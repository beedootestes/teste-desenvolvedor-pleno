import { Router } from "express";
import { createAnswers } from "../middlewares/createAnswers";
import CreateAnswersController from "../controllers/answersControllers/createAnswers.controller";
import ListAnswersToQuestionController from "../controllers/answersControllers/listAnswersToQuestion.controller";

const routes = Router();

const createAnswersControllers = new CreateAnswersController();
const listAnswersToQuestionController = new ListAnswersToQuestionController();

routes.post("/answers/create", createAnswers, createAnswersControllers.handle);
routes.get(
  "/answers/listAnswersToQuestion/:idQuestion",
  listAnswersToQuestionController.handle
);

export default routes;
