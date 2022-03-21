const isNotValidAnswer = (answers) => {
  if (Array.isArray(answers)) return !!(answers.find(row => (row.answer === undefined || row.answer === '')))
  else return (!answers)
}
  
const isNotValidQuestionId = (answers) => {
  return !!(answers.find(row => (row.questionId === undefined || row.questionId === '')))
}


export {
  isNotValidAnswer,
  isNotValidQuestionId
}