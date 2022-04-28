const express = require('express');
const db = require('../models/questionsAndAnswersModel');
const Router = express.Router();

Router.get('/', async (_req, res) => {
  try {
    const questions = await db.selectQuestionsAndAnswers();

    return res.status(200).json(questions);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

module.exports = Router;