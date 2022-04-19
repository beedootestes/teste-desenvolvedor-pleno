const answer = require('express').Router();
const answerController = require('../controllers/AnswerController');

answer.post('/', answerController.create);
answer.get('/', answerController.getAll);

module.exports = answer;
