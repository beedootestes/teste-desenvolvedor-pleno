import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { QuestionAnswersService } from './question-answers.service';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { UpdateQuestionAnswerDto } from './dto/update-question-answer.dto';

@Controller('questions')
export class QuestionAnswersController {
  constructor(
    private readonly questionAnswersService: QuestionAnswersService,
  ) {}

  @Post(':question/answers')
  create(
    @Param('question', new ParseUUIDPipe()) questionId: string,
    @Body() createQuestionAnswerDto: CreateQuestionAnswerDto,
  ) {
    return this.questionAnswersService.create(
      questionId,
      createQuestionAnswerDto,
    );
  }

  @Get(':question/answers')
  findAll(@Param('question', new ParseUUIDPipe()) questionId: string) {
    return this.questionAnswersService.findAll(questionId);
  }

  @Patch('answers/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateQuestionAnswerDto: UpdateQuestionAnswerDto,
  ) {
    return this.questionAnswersService.update(id, updateQuestionAnswerDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('answers/:id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.questionAnswersService.remove(id);
  }
}
