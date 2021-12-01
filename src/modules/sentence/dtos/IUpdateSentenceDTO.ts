interface IUpdateSentenceDTO {
  text?: string;
  type?: 'QUESTION' | 'ANSWER';
  enabled?: boolean;
}

export default IUpdateSentenceDTO;
