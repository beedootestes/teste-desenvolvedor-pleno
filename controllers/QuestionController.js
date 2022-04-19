const { StatusCodes } = require('http-status-codes');
const questionsService = require('../services/QuestionServices');

const create = async (req, res) => {
  try {
    const { question } = req.body;
    const newQuestion = await questionsService.create(question)
    return res.status(StatusCodes.CREATED).json(newQuestion);
  } catch (error) {
    console.error(error);
  }
};

const getAll = async (_req, res) => {
  try {
    const questions = await questionsService.getAll();
    return res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create,
  getAll,
};
