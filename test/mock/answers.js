const questions= require('./questions');

let answers = [
  {
    id: 1,
    answer: 'Yuri Gagarin',
    questionId: 1,
  },
  {
    id: 2,
    answer: 'Neil Armstrong',
    questionId: 1,
  },
  {
    id: 3,
    answer: 'Monte Everest',
    questionId: 2,
  },
  {
    id: 4,
    answer: 'Brasil',
    questionId: 3, // 'Que país tem o formato de uma bota?',
  },
  {
    id: 5,
    answer: 'Itália',
    questionId: 3, // 'Que país tem o formato de uma bota?',
  },
  {
    id: 6,
    answer: 'México',
    questionId: 3, // 'Que país tem o formato de uma bota?',
  }
];

const create = () => {
  const answer = 'Pico da Neblina';
  const questionId = 2;
  const newAnswerId = answers.map((value) => value.id);
  const lastId = Math.max(...newAnswerId);
  answers.push({ id: lastId + 1, answer, questionId });
  return answers.find((value) => value.id === (lastId + 1));
};

const getAll = () => {
  const allQuestions = questions.getAll();
  const allAnswers = allQuestions.map(({ id, question }) => {
    const result = answers.filter((value) => value.questionId === id);
    return {
      id,
      question,
      answers: [...result],
    }
  });
  return allAnswers;
};

const getById = () => {
  const id = 4;
  const answerId = answers.find((value) => value.id === id);
  if (!answerId) {
    return false;
  }
  return answerId;
};

const update = () => {
  const id = 4;
  const answer = { answer: 'Neil Armstrong Jr', questionId: 1 };
  const answerUpdate = answers.filter((value) => value.id !== id);
  answers = answerUpdate;
  answers.push({ id, ...answer });
  return { id, ...answer };
}

const deleteById = () => {
  const id = 4;
  const answerIndex = answers.findIndex((value) => value.id === id);
  answers.splice(answerIndex, 1);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
