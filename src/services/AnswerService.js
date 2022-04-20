const { Answers, Questions } = require('../models');

const create = async ({ answer, questionId }) => {
  try {
    const newAnswer = await Answers.create({ answer, questionId });
    return newAnswer;
  } catch (error) {
    console.error(error);
  }
};

const getAll = async () => {
  try {
    const answers = await Questions.findAll({
      include: [{
        model: Answers,
        as: 'Answer',
        attributes: ['answer','questionId'],
      }],
    });
    return answers;
  } catch (error) {
    console.error(error);
  }
};

const getById = async (id) => {
  try {
    const answer = await Answers.findByPk(id);
    return answer;
  } catch (error) {
    console.error(error);
  }
};

const update = async ({ id, answer, questionId }) => {
  try {
    await Answers.update(
      { answer, questionId },
      { where: { id } },
    );
    return { id, answer, questionId };
  } catch (error) {
    console.error(error);
  }
};

const deleteById = async (id) => {
  try {
    await Answers.destroy({ where: { id } })
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
