import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';

import { QuestionAnswersController } from './question-answers.controller';
import { QuestionAnswersService } from './question-answers.service';
import { QuestionAnswer } from './entities/question-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionAnswer])],
  controllers: [QuestionsController, QuestionAnswersController],
  providers: [QuestionsService, QuestionAnswersService],
})
export class QuestionsModule {}
