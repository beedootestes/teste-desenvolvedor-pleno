const { deleteAnswerUseCase } = require("./deleteAnswerUseCase");

const deleteAnswerController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteAnswerUseCase(id);
    return res.status(200).json({ message: 'Answer Deleted!' });
  } catch (error) {
    if (error) return res.status(400).json({ messsage: error });
    return res.status(500).json({ message: 'Internal Error.' });
  }
}

module.exports = { deleteAnswerController };
