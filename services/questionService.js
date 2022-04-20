const questionModel = require('../models/questionModel');

const getAll = async () => questionModel.getAll();

const getAllQuestionWithAnswers = async () => questionModel.getAllQuestionWithAnswers();

module.exports = { getAll, getAllQuestionWithAnswers };