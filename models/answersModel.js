const db = require('./db');

async function insertAnswer(question_id, answer) {
  const conn = await db.connect();
  const sql = 'INSERT INTO answers(question_id, answer) VALUES (?, ?);';
  const values = [question_id, answer];

  return await conn.query(sql, values);
}

async function selectQuestionAnswers(question_id) {
  const conn = await db.connect();
  const sql = 'SELECT * FROM answers WHERE question_id=?;';
  const values = [question_id]
  
  return await await conn.query(sql, values);
}

async function updateAnswer(question_id, answer_id, answer) {
  const conn = await db.connect();
  const sql = 'UPDATE answers SET answer=? WHERE question_id=? AND answer_id=?';
  const values = [answer, question_id, answer_id];

  return await conn.query(sql, values);
}

async function deleteAnswer(answer_id) {
  const conn = await db.connect();
  const sql = 'DELETE FROM answers WHERE answer_id=?';
  
  return await conn.query(sql, [answer_id])
}

module.exports = {
  insertAnswer,
  selectQuestionAnswers,
  updateAnswer,
  deleteAnswer
}