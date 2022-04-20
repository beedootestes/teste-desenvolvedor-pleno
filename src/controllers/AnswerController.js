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

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await answerService.getById(id);
    return res.status(StatusCodes.OK).json(answer);
  } catch (error) {
    console.error(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer, questionId } = req.body;
    const answerUpdate = await answerService.update({ id, answer, questionId });
    return res.status(StatusCodes.CREATED).json(answerUpdate);
  } catch (error) {
    console.error(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await answerService.deleteById(id);
    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
