const { Router } = require("express");
const { createQuestionController } = require("./useCases/createQuestion/createQuestionController");
const { deleteQuestionController } = require("./useCases/deleteQuestion/deleteQuestionController");
const { getAllQuestionsController } = require("./useCases/getAllQuestions/getAllQuestionsController");
const { getQuestionController } = require("./useCases/getQuestion/getQuestionController");
const { updateQuestionController } = require("./useCases/updateQuetion/updateQuestionController");

const router = Router();

router.post('/questions', createQuestionController);
router.get('/questions', getAllQuestionsController);
router.get('/questions/:id', getQuestionController);
router.put('/questions/:id', updateQuestionController);
router.delete('/questions/:id', deleteQuestionController);

module.exports = { router };
