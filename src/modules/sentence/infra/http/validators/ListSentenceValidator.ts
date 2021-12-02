import { object, string, number, enum as a, boolean } from 'zod';

const schema = object({
  pageOffSet: number().optional(),
  pageCount: number().optional(),
  pageSize: number().optional(),
  orderAttribute: string().optional(),
  orderType: a(['ASC', 'DESC']).optional(),
  filter: object({
    id: number().positive().int().optional(),
    question: number().positive().int().optional(),
    text: string().nonempty().max(256).optional(),
    type: a(['QUESTION', 'ANSWER' ]).optional(),
    enabled: boolean().optional(),
  }).optional(),
});

export default schema;
