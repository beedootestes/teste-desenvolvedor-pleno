const { Question } = require('../models');

const create = async (data) => {
  try {
    const newQuestion = await Question.create(data);
    return newQuestion.dataValues;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const getAll = async () => {
  const allQuestions = await Question.findAll();

  if (!allQuestions) return null;

  return allQuestions;
}

module.exports = { create, getAll };
