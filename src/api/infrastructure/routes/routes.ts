//All dependency imports
import express from 'express';
import {
    createQuestionController,
    deleteQuestionController,
    listQuestionsController,
    updateQuestionController
} from '../../controllers/questionsController/questionController';

//Route constant
const routes = express.Router();

//Question routes
routes.get('/questions', listQuestionsController);

routes.post('/question', createQuestionController);

routes.put('/question', updateQuestionController)

routes.delete('/question', deleteQuestionController);

//Exporting route constant
export default routes;