const question = require('express').Router();
const questionsController = require('../controllers/QuestionController');

question.post('/', questionsController.create);

module.exports = question;
