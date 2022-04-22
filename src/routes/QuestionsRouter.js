const question = require('express').Router();
const questionsController = require('../controllers/QuestionController');
const questionValidate = require('../middlewares/questionsValidate');

question.get('/:id', questionsController.getById);
question.delete('/:id', questionsController.deleteById);
question.put(
  '/:id',
  questionValidate.questionValid,
  questionsController.update,
);
question.post(
  '/',
  questionValidate.questionValid,
  questionsController.create,
);
question.get('/', questionsController.getAll);

module.exports = question;
