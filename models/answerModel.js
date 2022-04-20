const connection = require('./connection');
const tableAnswers = 'beedoo.answers';

// Alterar uma opção de RESPOSTA de uma PERGUNTA.
const updateAnswer = async(id, answerOptions) => {
    await connection.execute(`UPDATE ${tableAnswers} SET answerOptions=? WHERE answerId=?`, [answerOptions, id])
};

// Deletar uma opção de RESPOSTA de uma PERGUNTA.

module.exports = { updateAnswer };
