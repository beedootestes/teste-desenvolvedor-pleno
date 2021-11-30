import { ICreateAnswerDTO } from '@modules/questions/dtos/ICreateAnswerDTO';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { getRepository, Repository } from 'typeorm';


import { Answer } from '../entities/Answers';

class AnswersRepository implements IAnswersRepository {
    private ormRepository: Repository<Answer>;

    constructor() {
        this.ormRepository = getRepository(Answer);
    }
    
    public async create(answerData: ICreateAnswerDTO): Promise<Answer> {
        const answer = this.ormRepository.create(answerData);

        await this.ormRepository.save(answer);

        return answer;
    }
    
    public async find(): Promise<Answer[]> {
        const answer = await this.ormRepository.find();

        return answer;
    }

    public async findResgistredAnswerByQuestionId(title: string, question_id: string): Promise<Answer | undefined> {
        const answer = await this.ormRepository.findOne({ where: { title, question_id } });

        return answer;
    }

    public async findById(id: string): Promise<Answer | undefined> {
        const answer = await this.ormRepository.findOne({ where: { id } });

        return answer;
    }


    public async delete(id: string): Promise<any> {
        const answer = this.ormRepository.delete(id);

        return answer;
    }

    public async save(answer: Answer): Promise<Answer> {
        return this.ormRepository.save(answer);
    }
}

export {AnswersRepository};
