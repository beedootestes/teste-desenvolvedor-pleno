import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

const questionList: Question[] = [
  new Question({ id: '1', question: 'question-1' }),
  new Question({ id: '2', question: 'question-2' }),
  new Question({ id: '3', question: 'question-3' }),
];

const newQuestion = new Question({ question: 'new-question' });

const updatedQuestion = new Question({ question: 'question-updated' });

describe('QuestionsController', () => {
  let questionsController: QuestionsController;
  let questionsService: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [
        {
          provide: QuestionsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(questionList),
            create: jest.fn().mockResolvedValue(newQuestion),
            findOneOrFail: jest.fn().mockResolvedValue(questionList[0]),
            update: jest.fn().mockResolvedValue(updatedQuestion),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    questionsController = module.get<QuestionsController>(QuestionsController);
    questionsService = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(questionsController).toBeDefined();
    expect(questionsService).toBeDefined();
  });

  describe('index', () => {
    it('should return a questions list successfully', async () => {
      const result = await questionsController.findAll();

      expect(result).toEqual(questionList);
      expect(typeof result).toEqual('object');
      expect(questionsService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(questionsService, 'findAll')
        .mockRejectedValueOnce(new Error());
      expect(questionsController.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new question item successfully', async () => {
      const body: CreateQuestionDto = {
        question: 'new-question',
      };

      const result = await questionsController.create(body);

      expect(result).toEqual(newQuestion);
      expect(questionsService.create).toHaveBeenCalledTimes(1);
      expect(questionsService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      const body: CreateQuestionDto = {
        question: 'new-question',
      };

      jest.spyOn(questionsService, 'create').mockRejectedValueOnce(new Error());
      expect(questionsController.create(body)).rejects.toThrowError();
    });
  });

  describe('show', () => {
    it('should get a question item successfully', async () => {
      const result = await questionsController.findOne('1');
      expect(result).toEqual(questionList[0]);
      expect(questionsService.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(questionsService.findOneOrFail).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      jest
        .spyOn(questionsService, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      expect(questionsController.findOne('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a question item successfully', async () => {
      const body: UpdateQuestionDto = {
        question: 'question-1',
      };
      const result = await questionsController.update('1', body);

      expect(result).toEqual(updatedQuestion);
      expect(questionsService.update).toHaveBeenCalledTimes(1);
      expect(questionsService.update).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', () => {
      const body: UpdateQuestionDto = {
        question: 'question-1',
      };

      jest.spyOn(questionsService, 'update').mockRejectedValueOnce(new Error());
      expect(questionsController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should remove a question item successfully', async () => {
      const result = await questionsController.remove('1');
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      jest.spyOn(questionsService, 'remove').mockRejectedValueOnce(new Error());

      expect(questionsController.remove('1')).rejects.toThrowError();
    });
  });
});
