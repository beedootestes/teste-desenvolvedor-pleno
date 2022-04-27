const { Router } = require("express");
const { createQuestionController } = require("./useCases/createQuestion/createQuestionController");
const { getAllQuestionsController } = require("./useCases/getAllQuestions/getAllQuestionsController");
const { updateQuestionController } = require("./useCases/updateQuetion/updateQuestionController");

const router = Router();

router.post('/questions', createQuestionController);
router.get('/questions', getAllQuestionsController);
router.put('/questions/:id', updateQuestionController);

module.exports = { router };
