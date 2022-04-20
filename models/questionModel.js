const connection = require('./connection');

const tableQuestions = 'beedoo.questions';
const tableAnswers = 'beedoo.answers';

const getAll = async () => {
  const [all] = await connection.execute(`SELECT question FROM ${tableQuestions}`);

  return all;
};

const getAllQuestionsWithAnswers = async () => {
  const [all] = await connection.execute(
    `SELECT q.question AS question, 
    q.id AS questionId,
    a.answerOptions AS answers, 
    a.answerId AS answersId
    FROM questions AS q
    INNER JOIN answers AS a
    ON q.answerId = a.answerId;`
  );

  return all;
};

const createQuestion = async (question) => {
  const [insertAnswer] = await connection.execute(`INSERT INTO ${tableAnswers} (answerOptions) VALUES (DEFAULT)`);

  const [newQuestion] = await connection.execute(`INSERT INTO ${tableQuestions} (question, answerId) VALUES (?, ?)`, [question, --insertAnswer.insertId]);

  return {
    id: newQuestion.insertId,
    question,
    answerId: insertAnswer.insertId
  };
};

const getQuestionById = async (id) => {
  const [question] = await connection.execute(`SELECT * FROM ${tableQuestions} WHERE id=?`,[ parseInt(id, 10)]);

  return question[0];
};

const updateQuestion = async (id, question) => {
  await connection.execute(`UPDATE ${tableQuestions} SET question=? WHERE id=?`, [question, id]);

  return {
    id,
    question,
  };
};

const removeQuestion = async (id) => {
  const question = await getQuestionById(id);

  await connection.execute(`DELETE FROM ${tableQuestions} WHERE id=?`, [id]);

  return question;
};

module.exports = { getAll, getAllQuestionsWithAnswers, createQuestion, getQuestionById, updateQuestion,removeQuestion };