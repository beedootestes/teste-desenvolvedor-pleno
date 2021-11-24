import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);
    return await this.questionRepository.save(question);
  }

  findAll() {
    return this.questionRepository.find();
  }

  findWithAnswers() {
    return this.questionRepository.find({
      relations: ['answers'],
    });
  }

  async findOneOrFail(id: string) {
    try {
      return await this.questionRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException('Pergunta não encontrada');
    }
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.findOneOrFail(id);

    this.questionRepository.merge(question, updateQuestionDto);
    return await this.questionRepository.save(question);
  }

  async remove(id: string) {
    await this.findOneOrFail(id);
    await this.questionRepository.delete(id);
  }
}
