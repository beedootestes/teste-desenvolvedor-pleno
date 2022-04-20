const express = require('express');
const app = express();
const rescue = require('express-rescue');

const Questions = express.Router();

const questionService = require('../services/questionService');
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));

Questions.get('/', rescue(async (_req, res) => {
  const allQuestions = await questionService.getAll();

  if (!allQuestions) return res.status(404).json({ message: 'No questions found' });

  return res.status(200).json(allQuestions);
}));

Questions.get('/QandA', rescue(async (_req, res) => {
  const getQuestionsAndAnswers = await questionService.getAllQuestionsWithAnswers();

  return res.status(200).json(getQuestionsAndAnswers);
}));

Questions.post('/', rescue(async (req, res) => {
  const { question } = req.body;
  const newQuestion = await questionService.createQuestion({ question });

  return res.status(201).json(newQuestion);
}));

Questions.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { question } = req.body;

  const questionById = await questionService.getQuestionById(id);

  if(!questionById) return res.status(404).json('Question not found');

  const updatedQuestion = await questionService.updateQuestion({ id, question });

  return res.status(200).json(updatedQuestion);
}));

Questions.delete('/:id', rescue(async(req, res) => {
  const { id } = req.params;

  const question = await questionService.getQuestionById(id);

  if (!question) return res.status(404).json({ message: 'Question not found' });

  await questionService.removeQuestion(id);
  const remainedQuestions = await questionService.getAllQuestionsWithAnswers();

  return res.status(200).json(remainedQuestions);
}));


module.exports = Questions;
