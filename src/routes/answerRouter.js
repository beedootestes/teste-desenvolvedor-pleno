const answer = require('express').Router();
const answerController = require('../controllers/AnswerController');
const answerValidate = require('../middlewares/answersValidate');
const questionValidate = require('../middlewares/questionsValidate');

answer.put(
  '/:id',
  answerValidate,
  questionValidate.questionsExists,
  answerController.update,
);
answer.get('/:id', answerController.getById);
answer.delete('/:id', answerController.deleteById);
answer.post(
  '/',
  answerValidate,
  questionValidate.questionsExists,
  answerController.create,
);
answer.get('/', answerController.getAll);

module.exports = answer;
