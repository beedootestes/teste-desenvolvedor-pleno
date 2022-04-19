const answer = require('express').Router();
const answerController = require('../controllers/AnswerController');

answer.post('/', answerController.create);

module.exports = answer;
