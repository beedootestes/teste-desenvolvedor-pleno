const { Router } = require("express");

const { createQuestionController } = require("./useCases/createQuestion/createQuestionController");
const { deleteQuestionController } = require("./useCases/deleteQuestion/deleteQuestionController");
const { getAllQuestionsController } = require("./useCases/getAllQuestions/getAllQuestionsController");
const { getQuestionController } = require("./useCases/getQuestion/getQuestionController");
const { updateQuestionController } = require("./useCases/updateQuestion/updateQuestionController");

const { createAnswerController } = require("./useCases/createAnswer/createAnswerController");
const { deleteAnswerController } = require("./useCases/deleteAnswer/deleteAnswerController");
const { getAllAnswersController } = require("./useCases/getAllAnswersByQuestion/getAllAnswersController");
const { updateAnswerController } = require("./useCases/updateAnswer/updateAnswerController");

const router = Router();

router.post('/questions', createQuestionController);
router.get('/questions', getAllQuestionsController);
router.get('/questions/:id', getQuestionController);
router.put('/questions/:id', updateQuestionController);
router.delete('/questions/:id', deleteQuestionController);

router.post('/answers', createAnswerController);
router.delete('/answers/:id', deleteAnswerController);
router.get('/answers/:id', getAllAnswersController);
router.put('/answers/:id', updateAnswerController);

module.exports = { router };
