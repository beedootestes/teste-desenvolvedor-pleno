const isNotValidAnswer = (answers) => {
  if (answers.length !== undefined) return !!(answers.find(row => (row.answer === undefined || row.answer === '')))
  else return (!answers.answer || answers.length === 0)
}
  
const isNotValidQuestionId = (answers) => {
  return !!(answers.find(row => (row.questionId === undefined || row.questionId === '')))
}


export {
  isNotValidAnswer,
  isNotValidQuestionId
}