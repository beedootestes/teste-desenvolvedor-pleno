import { object, string, enum as a } from 'zod';

const schema = object({
  text: string().nonempty().max(256).optional(),
  type: a(['QUESTION', 'ANSWER' ]).optional(),
});

export default schema;
