interface ISentenceFiltersDTO {
  where?: {
    id?: number;
    question?: number;
    text?: string;
    type?: 'QUESTION' | 'ANSWER';
    enabled?: boolean;
  };
  order?: {
    by: string;
    dsc: boolean;
  };
  page?: {
    size: number;
    offset: number;
    count?: number;
  };
}

export default ISentenceFiltersDTO;
