let questions = [
  {
    id: 1,
    question: 'Quem foi a primeira pessoa a viajar no Espaço?',
  },
  {
    id: 2,
    question: 'Qual a montanha mais alta do mundo?',
  },
  {
    id: 3,
    question: 'Que país tem o formato de uma bota?',
  }
];

const create = () => {
  const question = 'Quais são as fases da Lua?'
  const newQuestionId = questions.map((value) => value.id);
  const lastId = Math.max(...newQuestionId);
  questions.push({ id: lastId + 1, question })
  return questions.find((value) => value.id === (lastId + 1));
}

const getAll = () => {
  return questions;
};

const getById = () => {
  const id = 2;
  const question = questions.find((value) => value.id === id);
  return question;
};

const update = () => {
  const id = 1;
  const question = 'A que temperatura a água ferve?'
  const questionUpdate = questions.find((value) => value.id === id);
  questionUpdate.question = question;
  return questionUpdate;
}

module.exports = {
  update,
  getAll,
  getById,
  create,
};