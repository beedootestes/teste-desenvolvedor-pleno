const answer = require('express').Router();
const answerController = require('../controllers/AnswerController');
const answerValidate = require('../middlewares/answersValidate');

answer.put('/:id', answerValidate, answerController.update);
answer.get('/:id', answerController.getById);
answer.delete('/:id', answerController.deleteById);
answer.post('/', answerValidate, answerController.create);
answer.get('/', answerController.getAll);

module.exports = answer;
