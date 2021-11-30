import { getRepository, Repository } from 'typeorm';

import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { ICreateQuestionDTO } from '@modules/questions/dtos/ICreateQuestionDTO';

import { Question } from '../entities/Question';

class QuestionsRepository implements IQuestionsRepository {
    private ormRepository: Repository<Question>;

    constructor() {
        this.ormRepository = getRepository(Question);
    }
    
    public async create(questionData: ICreateQuestionDTO): Promise<Question> {
        const question = this.ormRepository.create(questionData);

        await this.ormRepository.save(question);

        return question;
    }
    
    public async find(): Promise<Question[]> {
        const findQuestions = await this.ormRepository.find();

        return findQuestions;
    }

    public async findByTitle(title: string): Promise<Question | undefined> {
        const findQuestion = await this.ormRepository.findOne({ where: { title } });

        return findQuestion;
    }

    public async findById(id: string): Promise<Question | undefined> {
        const findQuestion = await this.ormRepository.findOne({ where: { id } });

        return findQuestion;
    }


    public async delete(id: string): Promise<any> {
        const question = this.ormRepository.delete(id);

        return question;
    }

    public async save(question: Question): Promise<Question> {
        return this.ormRepository.save(question);
    }
}

export  {QuestionsRepository};
