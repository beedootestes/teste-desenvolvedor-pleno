const connection = require('./connection');

const tableQuestions = 'beedoo.questions';

const getAll = async () => {
  const [all] = await connection.execute(`SELECT question FROM ${tableQuestions}`);

  return all;
};

const getAllQuestionWithAnswers = async () => {
  const [all] = await connection.execute(
    `SELECT q.question AS question,
    a.answerOptions AS answers
    FROM questions AS q
    INNER JOIN answers AS a
    ON q.answerId = a.answerId;`
  );

  return all;
};

module.exports = { getAll, getAllQuestionWithAnswers };