import { Test, TestingModule } from '@nestjs/testing';
import { QuestionAnswersController } from './question-answers.controller';
import { QuestionAnswersService } from './question-answers.service';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { UpdateQuestionAnswerDto } from './dto/update-question-answer.dto';
import { QuestionAnswer } from './entities/question-answer.entity';
import { Question } from './entities/question.entity';

const questionAnswersList: QuestionAnswer[] = [
  new QuestionAnswer({
    question_id: '1',
    id: '1',
    answer: 'answer-1',
  }),
  new QuestionAnswer({
    question_id: '1',
    id: '2',
    answer: 'answer-2',
  }),
  new QuestionAnswer({
    question_id: '1',
    id: '3',
    answer: 'answer-3',
  }),
];

const question = new Question({
  id: '1',
  question: 'question-1',
});

const newQuestionAnswer = new QuestionAnswer({
  answer: 'new-answer',
  question_id: '1',
});

const updatedQuestionAnswer = new QuestionAnswer({
  answer: 'answer-updated',
  question_id: '2',
});

describe('QuestionAnswersController', () => {
  let questionAnswersController: QuestionAnswersController;
  let questionAnswersService: QuestionAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionAnswersController],
      providers: [
        {
          provide: QuestionAnswersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(questionAnswersList),
            create: jest.fn().mockResolvedValue(newQuestionAnswer),
            findOneOrFail: jest.fn().mockResolvedValue(questionAnswersList[0]),
            update: jest.fn().mockResolvedValue(updatedQuestionAnswer),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    questionAnswersController = module.get<QuestionAnswersController>(
      QuestionAnswersController,
    );
    questionAnswersService = module.get<QuestionAnswersService>(
      QuestionAnswersService,
    );
  });

  it('should be defined', () => {
    expect(questionAnswersController).toBeDefined();
    expect(questionAnswersService).toBeDefined();
  });

  describe('index', () => {
    it('should return an answers list successfully', async () => {
      const result = await questionAnswersController.findAll('1');

      expect(result).toEqual(questionAnswersList);
      expect(typeof result).toEqual('object');
      expect(questionAnswersService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(questionAnswersService, 'findAll')
        .mockRejectedValueOnce(new Error());
      expect(questionAnswersController.findAll('1')).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new question answer item successfully', async () => {
      const body: CreateQuestionAnswerDto = {
        answer: 'new-answer',
      };
      const result = await questionAnswersController.create(question.id, body);

      expect(result).toEqual(newQuestionAnswer);
      expect(questionAnswersService.create).toHaveBeenCalledTimes(1);
      expect(questionAnswersService.create).toHaveBeenCalledWith(
        question.id,
        body,
      );
    });

    it('should throw an exception', () => {
      const body: CreateQuestionAnswerDto = {
        answer: 'new-answer',
      };

      jest
        .spyOn(questionAnswersService, 'create')
        .mockRejectedValueOnce(new Error());
      expect(
        questionAnswersController.create(question.id, body),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a question answer item successfully', async () => {
      const body: UpdateQuestionAnswerDto = {
        answer: 'answer-1',
      };
      const result = await questionAnswersController.update('1', body);

      expect(result).toEqual(updatedQuestionAnswer);
      expect(questionAnswersService.update).toHaveBeenCalledTimes(1);
      expect(questionAnswersService.update).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', () => {
      const body: UpdateQuestionAnswerDto = {
        answer: 'answer-1',
      };

      jest
        .spyOn(questionAnswersService, 'update')
        .mockRejectedValueOnce(new Error());
      expect(
        questionAnswersController.update('1', body),
      ).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should remove a question answer item successfully', async () => {
      const result = await questionAnswersController.remove('1');
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      jest
        .spyOn(questionAnswersService, 'remove')
        .mockRejectedValueOnce(new Error());

      expect(questionAnswersController.remove('1')).rejects.toThrowError();
    });
  });
});
