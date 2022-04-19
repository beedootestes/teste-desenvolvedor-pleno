const { Questions } = require('../models');

const create = async (question) => {
  try {
    const newQuestion = await Questions.create({ question });
    return newQuestion;
  } catch (error) {
    console.error(error);
  }
}

const getAll = async () => {
  try {
    const questions = await Questions.findAll();
    return questions;
  } catch (error) {
    console.error(error);
  }
};


const getById = async (id) => {
  try {
    const question = await Questions.findByPk(id);
    return question;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
