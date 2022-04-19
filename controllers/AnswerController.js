const { StatusCodes } = require('http-status-codes');
const answerService = require('../services/AnswerService');

const create = async (req, res) => {
  try {
    const { answer, questionId } = req.body;
    const newAnswer = await answerService.create({ answer, questionId });
    return res.status(StatusCodes.CREATED).json(newAnswer);
  } catch (error) {
    console.error(error);
  }
};

const getAll = async (_req, res) => {
  try {
    const answers = await answerService.getAll();
    return res.status(StatusCodes.OK).json(answers);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create,
  getAll,
};
