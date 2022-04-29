const { deleteQuestionUseCase } = require("./deleteQuestionUseCase");

const deleteQuestionController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteQuestionUseCase(id);
    return res.status(200).json({ message: 'Question Deleted!' });
  } catch (error) {
    if (error) return res.status(400).json({ message: error });
    return res.status(500).json({ message: 'Internal Error.' });
  }
}

module.exports = { deleteQuestionController };
