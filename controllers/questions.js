const rescue = require('express-rescue');
const Service = require('../services/questions');

const create = rescue(async (req, res) => {
  const { question } = req.body;

  const newQuestion = await Service.create(question);

  if(!newQuestion) return res.status(409).json({ message: 'Question already registered!' });

  return res.status(201).json(newQuestion);
});

const getAll = rescue(async (_req, res) => {
  const questions = await Service.getAll();

  if (!questions || questions.length === 0) return res.status(404).json( { message: 'No questions registered yet!' } );

  res.status(200).json(questions);
});

module.exports = { create, getAll };
