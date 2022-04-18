const router = require('express').Router();

const questions = require('./questions');

router.get('/questions', questions.getAll);
