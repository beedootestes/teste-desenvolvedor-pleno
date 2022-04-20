const connection = require('./connection');

const tableQuestions = 'beedoo.questions';

const getAll = async () => {
  const [all] = await connection.execute(`SELECT question FROM ${tableQuestions}`);

  return all;
};

const getAllQuestionsWithAnswers = async () => {
  const [all] = await connection.execute(
    `SELECT q.question AS question,
    a.answerOptions AS answers
    FROM questions AS q
    INNER JOIN answers AS a
    ON q.answerId = a.answerId;`
  );

  return all;
};

// const createQuestion = async (question) => {
//   const question = question.map(async ({
//     answerId, question
//   }) => {
//     await connection.execute(`INSERT INTO ${tableQuestions} (question, answerId) VALUES(?, ?)`, [])
//   });
// };

module.exports = { getAll, getAllQuestionsWithAnswers };