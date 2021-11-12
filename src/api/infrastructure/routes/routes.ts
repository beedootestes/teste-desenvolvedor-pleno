import express from 'express';
import {
    createQuestionController,
    deleteQuestionController,
    listQuestionsController,
    updateQuestionController
} from '../../controllers/questionsController/questionController';

const routes = express.Router();

routes.post('/question', createQuestionController)
routes.put('/question', updateQuestionController)
routes.delete('/question', deleteQuestionController)
routes.get('/questions', listQuestionsController)

export default routes;