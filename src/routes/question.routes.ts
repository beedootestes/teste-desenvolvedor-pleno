import CreateQuestionController from "../controllers/createQuestion.controller";
import { createQuestion } from "../middlewares/createQuestion";
import { Router } from "express";

const routes = Router();

const createQuestionController = new CreateQuestionController();

routes.post(
  "/question/create",
  createQuestion,
  createQuestionController.handle
);

export default routes;
