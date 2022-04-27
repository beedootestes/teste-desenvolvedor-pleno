const express = require('express');
const questionController = require('./controllers/questionsController');
const answerController = require('./controllers/answersController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/question', questionController);
app.use('/answer', answerController);

app.listen(3000, ()=> {
  console.log("Aplicação rodando na porta 3000")
});

// (async () => {
//   const db = require("./models/questionsModel");
//   console.log('Iniciando');

//   console.log('SELECT * FROM questions');
//   const questions = await db.selectQuestion();
//   console.log(questions);

//   console.log('INSERT INTO questions');
//   const insetNewQuestion = await db.insertQuestion({question: "Qual é o seu nome?"});
//   console.log(insetNewQuestion);

//   console.log('UPDATE questions');
//   const updateEachQuestion = await db.updateQuestion(1, {question: "E aí, tudo bem?"});
//   console.log(updateEachQuestion);

//   console.log('DELETE FROM questions');
//   const deleteEachQuestion = await db.deleteQuestion(2);
//   console.log(deleteEachQuestion);
// })();