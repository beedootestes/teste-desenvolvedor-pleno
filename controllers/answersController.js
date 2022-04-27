const express = require('express');
const db = require('../models/answersModel');
const Router = express.Router();

Router.post('/', async (req, res) => {
  try {
    const { question_id, answer } = req.body;
    await db.insertAnswer(question_id, answer);

    return res.status(201).json(answer);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

Router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const answers = await db.selectQuestionAnswers(id);

    return res.status(200).json(answers[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

Router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { answer_id, answer } = req.body;
    await db.updateAnswer(id, answer_id, answer);

    return res.status(200).json(answer);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

Router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteAnswer(id);

    return res.status(200).json("Deleted Message");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

module.exports = Router;