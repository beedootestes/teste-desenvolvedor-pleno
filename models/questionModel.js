const connection = require('./connection');

const tableQuestions = 'beedoo.questions';

const getAll = async () => {
  const [all] = await connection.execute(`SELECT question FROM ${tableQuestions}`);

  return all;
};

module.exports = { getAll };