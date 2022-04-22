const Joi = require('joi');

const questionsSchema = Joi.object({
  question: Joi.string().min(20).required(),
}).strict();

module.exports = {
  questionsSchema,
};
