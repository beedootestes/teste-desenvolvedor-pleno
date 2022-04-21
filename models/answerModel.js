const connection = require('./connection');
const tableAnswers = 'beedoo.answers';

const getAll = async () => {
  const [all] = await connection.execute(`SELECT * FROM ${tableAnswers}`);
  
  return all;
}

const getAnswerById = async (answerId) => {
  const [answerOption] = await connection.execute(`SELECT answerOptions FROM ${tableAnswers} WHERE answerId=?`, [parseInt(answerId, 10)]);

  return answerOption[0];
};

const updateAnswer = async(answerId, answerOptions) => {
  await connection.execute(`UPDATE ${tableAnswers} SET answerOptions=? WHERE answerId=?;`, [answerOptions, answerId]);

  return {
    answerId,
    answerOptions,
  };
};

module.exports = { getAll, updateAnswer, getAnswerById };
