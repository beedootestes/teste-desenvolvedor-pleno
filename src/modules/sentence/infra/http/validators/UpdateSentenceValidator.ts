import { object, string } from 'zod';

const schema = object({
  text: string().nonempty().max(256).optional(),
});

export default schema;
