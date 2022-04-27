const { createQuestionUseCase } = require("./createQuestionUseCase");

const createQuestionController = async (req, res) => {
  try {
    const { question } = req.body;
    console.log(question);
    const questionCreated = await createQuestionUseCase(question);
    return res.status(201).json(questionCreated);
  } catch (error) {
    return res.status(400).json({ messsage: error.messsage || 'Internal Error.' })
  }
}

module.exports = { createQuestionController };
