const { getQuestionUseCase } = require("./getQuestionUseCase");

const getQuestionController = async (req, res) => {
  try {
    const { id } = req.params;
    const getQuestion = await getQuestionUseCase(id);
    return res.status(200).json(getQuestion);
  } catch (error) {
    if (error) return res.status(400).json({ messsage: error });
    return res.status(500).json({ message: 'Internal Error.' });
  }
}

module.exports = { getQuestionController };
