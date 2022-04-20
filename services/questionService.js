const questionModel = require('../models/questionModel');

const getAll = async () => questionModel.getAll();

const getAllQuestionsWithAnswers = async () => questionModel.getAllQuestionsWithAnswers();

module.exports = { getAll, getAllQuestionsWithAnswers };