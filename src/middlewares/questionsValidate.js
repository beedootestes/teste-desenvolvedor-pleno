const { questionsSchema } = require('./schemas');
const { StatusCodes } = require('http-status-codes');

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

module.exports = questionValid;
