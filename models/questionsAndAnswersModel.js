const db = require('./db');

async function selectQuestionsAndAnswers() {
  const conn = await db.connect();
  const [rows] = await conn.query('SELECT q.question, a.answer FROM crud.questions AS q INNER JOIN crud.answers AS a ON q.question_id = a.question_id;')

  return rows;
}

module.exports = {
  selectQuestionsAndAnswers
}