const question = require('express').Router();
const questionsController = require('../controllers/QuestionController');

question.post('/', questionsController.create);
question.get('/', questionsController.getAll);

module.exports = question;
