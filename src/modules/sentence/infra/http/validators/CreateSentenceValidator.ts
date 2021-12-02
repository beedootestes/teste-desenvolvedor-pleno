import { object, number, string, enum as a } from 'zod';

const schema = object({
  question: number().positive().int().optional(),
  text: string().nonempty().max(256),
  type: a(['QUESTION', 'ANSWER' ])
});

export default schema;
