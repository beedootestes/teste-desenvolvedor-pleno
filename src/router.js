const { Router } = require("express");
const { createQuestionController } = require("./useCases/createQuestion/createQuestionController");

const router = Router();

router.post('/questions', createQuestionController);
router.get('/', (req, res) => res.send('oi'));

module.exports = { router };
