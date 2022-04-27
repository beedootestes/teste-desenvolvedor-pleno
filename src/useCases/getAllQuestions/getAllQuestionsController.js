const { getAllQuestionsUseCase } = require("./getAllQuestionsUseCase");

const getAllQuestionsController = async (req, res) => {
  try {
    const getAllQuestions = await getAllQuestionsUseCase();
    return res.status(200).json(getAllQuestions);
  } catch (error) {
    return res.status(400).json({ messsage: error.messsage || 'Internal Error.' })
  }
}

module.exports = { getAllQuestionsController };
