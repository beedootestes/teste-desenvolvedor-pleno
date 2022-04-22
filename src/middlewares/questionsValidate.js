const { questionsSchema } = require('./schemas');
const { StatusCodes } = require('http-status-codes');
const questionsService = require('../services/QuestionServices');

const questionValid = (req, res, next) => {
  const { body } = req;
  const valid = questionsSchema.validate(body);
  if (valid.error) {
    const { message } = valid.error.details[0];
    const code = (message.includes('is required')
      ? StatusCodes.BAD_REQUEST
      : StatusCodes.UNPROCESSABLE_ENTITY);
    return res.status(code).json({ error: message });
  }
  next();
};

const questionsExists = async (req, res, next) => {
  const { questionId } = req.body;
  const question = await questionsService.getById(questionId);
  if (!question) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Question does not exist' })
  }

  next();
};

module.exports = {
  questionValid,
  questionsExists,
};
