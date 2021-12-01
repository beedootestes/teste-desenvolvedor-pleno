interface ICreateSentenceDTO {
  question?: number;
  text: string;
  type: 'QUESTION' | 'ANSWER';
}

export default ICreateSentenceDTO;
