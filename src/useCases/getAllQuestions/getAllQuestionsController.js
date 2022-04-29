const { getAllQuestionsUseCase } = require("./getAllQuestionsUseCase");

const getAllQuestionsController = async (req, res) => {
  try {
    const getAllQuestions = await getAllQuestionsUseCase();
    return res.status(200).json(getAllQuestions);
  } catch (error) {
    if (error) return res.status(400).json({ message: error });
    return res.status(500).json({ message: 'Internal Error.' });
  }
}

module.exports = { getAllQuestionsController };
