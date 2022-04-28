const { updateAnswerUseCase } = require("./updateAnswerUseCase");

const updateAnswerController = async (req, res) => {
  try {
    const { answer } = req.body;
    const { id } = req.params;
    const answerUpdated = await updateAnswerUseCase(id, answer);
    return res.status(200).json(answerUpdated);
  } catch (error) {
    if (error) return res.status(400).json({ messsage: error });
    return res.status(500).json({ message: 'Internal Error.' });
  }
}

module.exports = { updateAnswerController };
