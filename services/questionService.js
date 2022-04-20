const questionModel = require('../models/questionModel');

const getAll = async () => questionModel.getAll();

const getAllQuestionsWithAnswers = async () => questionModel.getAllQuestionsWithAnswers();

const createQuestion = async ({ question }) => questionModel.createQuestion(question);

module.exports = { getAll, getAllQuestionsWithAnswers, createQuestion };