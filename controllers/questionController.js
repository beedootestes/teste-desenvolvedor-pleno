const express = require('express');
const rescue = require('express-rescue');

const Questions = express.Router();

const questionService = require('../services/questionService');

Questions.get('/', rescue(async (_req, res) => {
  const allQuestions = await questionService.getAll();

  if (!allQuestions) return res.status(404).json({ message: 'No questions found' });

  return res.status(200).json(allQuestions);
}));

Questions.get('/QandA', async (_req, res) => {
  const getQuestionsandAnswers = await questionService.getAllQuestionWithAnswers();

  res.status(200).json(getQuestionsandAnswers);
});

module.exports = Questions;
