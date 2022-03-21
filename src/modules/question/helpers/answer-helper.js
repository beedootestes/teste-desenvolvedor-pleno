const isNotValidAnswer = (answers) => {
  return !!(answers.find(row => (row.answer === undefined || row.answer === '')))
}
  
const isNotValidQuestionId = (answers) => {
  return !!(answers.find(row => (row.questionId === undefined || row.questionId === '')))
}


export {
  isNotValidAnswer,
  isNotValidQuestionId
}