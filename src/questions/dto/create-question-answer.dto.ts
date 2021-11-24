import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionAnswerDto {
  @IsNotEmpty({ message: 'O texto da resposta deve ser fornecido.' })
  @IsString({
    message: 'O texto da resposta deve ser fornecido corretamente (texto).',
  })
  answer: string;
}
