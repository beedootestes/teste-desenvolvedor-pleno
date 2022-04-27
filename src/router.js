const { Router } = require("express");
const { createQuestionController } = require("./useCases/createQuestion/createQuestionController");
const { getAllQuestionsController } = require("./useCases/getAllQuestions/getAllQuestionsController");

const router = Router();

router.post('/questions', createQuestionController);
router.get('/questions', getAllQuestionsController);

module.exports = { router };
