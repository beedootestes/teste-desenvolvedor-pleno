interface IListSentenceResponse {
  pageSize: number;
  totalItems: number;
  results: {
    index: {
      page: number;
      index: number;
    },
    sentence: {
      id: number;
      question?: number;
      text: string;
      type: 'QUESTION' | 'ANSWER';
      enabled: boolean;
    }
  }[];
}

export default IListSentenceResponse;
