const { createQuestionUseCase } = require("./createQuestionUseCase");

const createQuestionController = async (req, res) => {
  try {
    const { question } = req.body;
    const questionCreated = await createQuestionUseCase(question);
    return res.status(201).json(questionCreated);
  } catch (error) {
    if (error) return res.status(400).json({ message: error });
    return res.status(500).json({ message: 'Internal Error.' });
  }
}

module.exports = { createQuestionController };
