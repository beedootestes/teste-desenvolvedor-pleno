const { getAllAnswersUseCase } = require("./getAllAnswersUseCase");

const getAllAnswersController = async (req, res) => {
  try {
    const { id } = req.params;
    const getAllAnswers = await getAllAnswersUseCase(id);
    return res.status(200).json(getAllAnswers);
  } catch (error) {
    if (error) return res.status(400).json({ messsage: error });
    return res.status(500).json({ message: 'Internal Error.' });
  }
}

module.exports = { getAllAnswersController };
