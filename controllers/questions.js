const rescue = require('express-rescue');
const Service = require('../services/questions');

const getAll = rescue(async (_req, res) => {
  const questions = await Service.getAll();

  if (!questions) return res.status(404).json( { message: 'No questions registered yet!' } );

  res.status(200).json(questions);
});

module.exports = getAll;
