const questionModel = require('../models/questionModel');

const getAll = async () => questionModel.getAll();

const getAllQuestionsWithAnswers = async () => questionModel.getAllQuestionsWithAnswers();

const createQuestion = async ({ question }) => questionModel.createQuestion(question);

const getQuestionById = async (id) => questionModel.getQuestionById(id);

const updateQuestion = async ({id, question}) => {
  await questionModel.getQuestionById(id);

  const updatedQuestion = await questionModel.updateQuestion(id, question);

  return updatedQuestion;
}

const removeQuestion = async (id) => {
    await questionModel.removeQuestion(id);
  
    const questionsRemained = await questionModel.getAll();
  
    return questionsRemained;
  }

module.exports = { getAll, getAllQuestionsWithAnswers, createQuestion, getQuestionById, updateQuestion, removeQuestion };