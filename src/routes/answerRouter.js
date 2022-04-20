const answer = require('express').Router();
const answerController = require('../controllers/AnswerController');

answer.put('/:id', answerController.update);
answer.get('/:id', answerController.getById);
answer.delete('/:id', answerController.deleteById);
answer.post('/', answerController.create);
answer.get('/', answerController.getAll);

module.exports = answer;
