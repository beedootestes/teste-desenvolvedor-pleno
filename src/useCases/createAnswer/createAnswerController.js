const { createAnswerUseCase } = require("./createAnswerUseCase");

const createAnswerController = async (req, res) => {
  try {
    const [ answer, questionId ] = req.body;
    await createAnswerUseCase([ answer, questionId ]);
    return res.status(201).json({ message: 'Answers Inserted!' });
  } catch (error) {
    if (error) return res.status(400).json({ message: error });
    return res.status(500).json({ message: 'Internal Error.' });
  }
}

module.exports = { createAnswerController };
