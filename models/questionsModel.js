const db = require('./db');

async function selectQuestion() {
  const conn = await db.connect();
  const [rows] = await conn.query('SELECT * FROM questions;');
  
  return rows;
}

async function insertQuestion(question) {
  const conn = await db.connect();
  const sql = 'INSERT INTO questions(question) VALUES (?)';
  const values = [question.question];

  return await conn.query(sql, values)
}

async function updateQuestion(id, question) {
  const conn = await db.connect();
  const sql = 'UPDATE questions SET question=? WHERE id=?';
  const values = [question.question, id];

  return await conn.query(sql, values);
}

async function deleteQuestion(id) {
  const conn = await db.connect();
  const sql = 'DELETE FROM questions WHERE id=?';
  
  return await conn.query(sql, [id])
}

module.exports = {
  selectQuestion,
  insertQuestion,
  updateQuestion,
  deleteQuestion
}