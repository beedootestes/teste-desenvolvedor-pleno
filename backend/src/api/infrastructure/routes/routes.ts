//All dependency imports
import express from 'express';
import {
    createAnswerController,
    deleteAnswerController,
    listAnswersController,
    updateAnswerController
} from '../../controllers/answersController/answerController';
import {
    createQuestionController,
    deleteQuestionController,
    listQuestionsAnswersController,
    listQuestionsController,
    updateQuestionController
} from '../../controllers/questionsController/questionController';

//Route constant
const routes = express.Router();

//Question routes
routes.get('/questions', listQuestionsController);
routes.get('/questionsAnswers', listQuestionsAnswersController);

routes.post('/question', createQuestionController);

routes.put('/question', updateQuestionController)

routes.delete('/question', deleteQuestionController);

//Answers routes
routes.get('/answers', listAnswersController);

routes.post('/answer', createAnswerController);

routes.put('/answer', updateAnswerController);

routes.delete('/answer', deleteAnswerController);

//Exporting route constant
export default routes;