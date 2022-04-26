const express = require('express');
const db = require('../models/questionsModel');
const Router = express.Router();

Router.post('/', async (req, res) => {
  try {
    const { question } = req.body;
    await db.insertQuestion({ question });

    return res.status(201).json(question);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

Router.get('/', async (_req, res) => {
  try {
    const questions = await db.selectQuestion()

    return res.status(200).json(questions);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

Router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { question } = req.body;
    await db.updateQuestion(id, { question });

    return res.status(200).json(question);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

Router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteQuestion(id);

    return res.status(200).json("Deleted Message");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

module.exports = Router;