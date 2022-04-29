const { updateQuestionUseCase } = require("./updateQuestionUseCase");

const updateQuestionController = async (req, res) => {
  try {
    const { question } = req.body;
    const { id } = req.params;
    const questionUpdated = await updateQuestionUseCase(id, question);
    return res.status(200).json(questionUpdated);
  } catch (error) {
    if (error) return res.status(400).json({ message: error });
    return res.status(500).json({ message: 'Internal Error.' });
  }
}

module.exports = { updateQuestionController };
