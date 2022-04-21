const express = require('express');
const rescue = require('express-rescue');
const Answers = express.Router();

const answerService = require('../services/answerService');

Answers.get('/', rescue(async (_req, res) => {
  const all = await answerService.getAll();

  return res.status(200).json(all);
}));

Answers.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const answer = await answerService.getAnswerById(id);

  return res.status(200).json(answer);
}));

Answers.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { answerOptions } = req.body;

  const answerById = await answerService.getAnswerById(id);

  if (!answerById) return res.status(404).json({ message: 'Answer options not found' });

  const updatedAnswer = await answerService.updateAnswer({ id, answerOptions });

  return res.status(200).json(updatedAnswer);
});

module.exports = Answers;
