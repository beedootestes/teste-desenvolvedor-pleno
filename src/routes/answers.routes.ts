import CreateAnswersController from "../controllers/answersControllers/createAnswers.controller";
import { createAnswers } from "../middlewares/createAnswers";
import { Router } from "express";

const routes = Router();

const createAnswersControllers = new CreateAnswersController();

routes.post("/answers/create", createAnswers, createAnswersControllers.handle);

export default routes;
