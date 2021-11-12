import express from 'express';
import { createQuestionController, listQuestionsController } from '../../controllers/questionsController/questionController';

const routes = express.Router();

routes.post('/question', createQuestionController)
routes.get('/questions', listQuestionsController)

export default routes;