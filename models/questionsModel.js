const db = require('./db');

async function selectQuestion() {
  const conn = await db.connect();
  const [rows] = await conn.query('SELECT * FROM questions;');
  
  return rows;
}

async function insertQuestion(question) {
  const conn = await db.connect();
  const sql = 'INSERT INTO questions(question) VALUES (?)';
  const values = [question];

  return await conn.query(sql, values)
}

async function updateQuestion(question_id, question) {
  const conn = await db.connect();
  const sql = 'UPDATE questions SET question=? WHERE question_id=?';
  const values = [question, question_id];

  return await conn.query(sql, values);
}

async function deleteQuestion(question_id) {
  const conn = await db.connect();
  const sql = 'DELETE FROM questions WHERE question_id=?';
  
  return await conn.query(sql, [question_id])
}

module.exports = {
  selectQuestion,
  insertQuestion,
  updateQuestion,
  deleteQuestion
}