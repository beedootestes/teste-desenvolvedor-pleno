import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';

const questionList: Question[] = [
  new Question({ question: 'question-1' }),
  new Question({ question: 'question-2' }),
  new Question({ question: 'question-3' }),
];

const updatedQuestion = new Question({ question: 'question-1' });

describe('QuestionService', () => {
  let questionService: QuestionsService;
  let questionRepository: Repository<Question>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: getRepositoryToken(Question),
          useValue: {
            find: jest.fn().mockResolvedValue(questionList),
            findOneOrFail: jest.fn().mockResolvedValue(questionList[0]),
            create: jest.fn().mockReturnValue(questionList[0]),
            merge: jest.fn().mockReturnValue(updatedQuestion),
            save: jest.fn().mockResolvedValue(questionList[0]),
            delete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    questionService = module.get<QuestionsService>(QuestionsService);
    questionRepository = module.get<Repository<Question>>(
      getRepositoryToken(Question),
    );
  });

  it('should be defined', () => {
    expect(questionService).toBeDefined();
    expect(questionRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a questions list successfully', async () => {
      const result = await questionService.findAll();

      expect(result).toEqual(questionList);
      expect(questionRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(questionRepository, 'find').mockRejectedValueOnce(new Error());

      expect(questionService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOneOrFail', () => {
    it('should return a question item successfully', async () => {
      const result = await questionService.findOneOrFail('1');

      expect(result).toEqual(questionList[0]);
      expect(questionRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest
        .spyOn(questionRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(questionService.findOneOrFail('1')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new question item successfully', async () => {
      const data: CreateQuestionDto = {
        question: 'question-1',
      };

      const result = await questionService.create(data);

      expect(result).toEqual(questionList[0]);
      expect(questionRepository.create).toHaveBeenCalledTimes(1);
      expect(questionRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      const data: CreateQuestionDto = {
        question: 'question-1',
      };

      jest.spyOn(questionRepository, 'save').mockRejectedValueOnce(new Error());

      expect(questionService.create(data)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a question item successfully', async () => {
      const data: UpdateQuestionDto = {
        question: 'question-1',
      };

      jest
        .spyOn(questionRepository, 'save')
        .mockResolvedValueOnce(updatedQuestion);

      const result = await questionService.update('1', data);

      expect(result).toEqual(updatedQuestion);
    });

    it('should throw a not found exception', () => {
      jest
        .spyOn(questionRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      const data: UpdateQuestionDto = {
        question: 'question-1',
      };

      expect(questionService.update('1', data)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw an exception', () => {
      jest.spyOn(questionRepository, 'save').mockRejectedValueOnce(new Error());

      const data: UpdateQuestionDto = {
        question: 'question-1',
      };

      expect(questionService.update('1', data)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should delete a question item successfully', async () => {
      const result = await questionService.remove('1');

      expect(result).toBeUndefined();
      expect(questionRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(questionRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest
        .spyOn(questionRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(questionService.remove('1')).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw an exception', () => {
      jest
        .spyOn(questionRepository, 'delete')
        .mockRejectedValueOnce(new Error());

      expect(questionService.remove('1')).rejects.toThrowError();
    });
  });
});
