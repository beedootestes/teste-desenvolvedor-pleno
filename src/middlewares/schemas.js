const Joi = require('joi');

const questionsSchema = Joi.object({
  question: Joi.string().min(20).required(),
}).strict();

const answersSchema = Joi.object({
  answer: Joi.string().min(3).required(),
  questionId: Joi.number().integer().positive().required(),
}).strict();

module.exports = {
  questionsSchema,
  answersSchema,
};
