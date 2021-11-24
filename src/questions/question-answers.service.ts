import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { UpdateQuestionAnswerDto } from './dto/update-question-answer.dto';
import { QuestionAnswer } from './entities/question-answer.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionAnswersService {
  constructor(
    @InjectRepository(QuestionAnswer)
    private readonly questionAnswerRepository: Repository<QuestionAnswer>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(
    questionId: string,
    createQuestionAnswerDto: CreateQuestionAnswerDto,
  ) {
    const question = await this.questionRepository.findOneOrFail(questionId);
    const questionAnswer = this.questionAnswerRepository.create({
      ...createQuestionAnswerDto,
      question_id: question.id,
    });
    return await this.questionAnswerRepository.save(questionAnswer);
  }

  findAll(questionId: string) {
    return this.questionAnswerRepository.find({ question_id: questionId });
  }

  async findOneOrFail(id: string) {
    try {
      return await this.questionAnswerRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException('Pergunta não encontrada');
    }
  }

  async update(id: string, updateQuestionAnswerDto: UpdateQuestionAnswerDto) {
    const questionAnswer = await this.findOneOrFail(id);

    this.questionAnswerRepository.merge(
      questionAnswer,
      updateQuestionAnswerDto,
    );
    return await this.questionAnswerRepository.save(questionAnswer);
  }

  async remove(id: string) {
    await this.findOneOrFail(id);
    await this.questionAnswerRepository.delete(id);
  }
}
