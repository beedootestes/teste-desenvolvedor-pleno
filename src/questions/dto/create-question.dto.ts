import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty({ message: 'O texto da pergunta deve ser fornecido.' })
  @IsString({
    message: 'O texto da pergunta dele ser fornecido corretamente (texto).',
  })
  question: string;
}
