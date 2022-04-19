const { StatusCodes } = require('http-status-codes');
const questionsService = require('../services/QuestionServices');

const create = async (req, res) => {
  const { question } = req.body;
  const newQuestion = await questionsService.create(question)
  return res.status(StatusCodes.CREATED).json(newQuestion);
}

module.exports = {
  create,
};
