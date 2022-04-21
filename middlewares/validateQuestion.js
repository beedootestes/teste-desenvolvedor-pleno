const questionService = require('../services/questionService');

const validateQuestion = async (req, res, next) => {
  const { question } = req.body;

  if (!question || question.length === 0) return res.status(400).json({ message: '"Question field is required"' });

  if (typeof question !== 'string') return res.status(400).json({ message: 'Question must be a string' });

  const questions = await questionService.getAll();

  if(questions.some((q) => q.question === question)) {
    return res.status(400).json({ message: 'Question already registered' });
  };
  next();
};

module.exports = { validateQuestion };