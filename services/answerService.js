const answerModel = require('../models/answerModel');

const getAll = async () => answerModel.getAll();

const updateAnswer = async ({ id, answerOptions }) => {
    await answerModel.getAnswerById(id);

    const updatedAnswer = await answerModel.updateAnswer(id, answerOptions);
  
    return updatedAnswer;
};

const getAnswerById = async (id) => answerModel.getAnswerById(id);

module.exports = { getAll, updateAnswer, getAnswerById };
