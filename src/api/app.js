require('dotenv').config();
const express = require('express');
const { StatusCodes } = require('http-status-codes');
const questionRouter = require('../routes/QuestionsRouter');
const answerRouter = require('../routes/answerRouter');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  return res.status(StatusCodes.OK).send('Funcionando');
});

app.use('/questions', questionRouter);
app.use('/answers', answerRouter);

module.exports = app;