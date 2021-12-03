interface IListQuestionResponse {
  questions: {
    id: number;
    text: string;
    answers: {
      id: number;
      text: string;
    }[]
  }[]
}

export default IListQuestionResponse;
