import { ICreateAnswerDTO } from '@modules/dtos/ICreateAnswerDTO';
import { IAnswersRepository } from '@modules/repositories/IAnswersRepository';
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

    public async findResgistredAnswerByQuestionId(title: string, question_id: string): Promise<Answer | any> {
        const answer = await this.ormRepository.findOne({where: {question_id, title}})

        return answer;
    }

    public async findById(id: string): Promise<Answer | undefined> {
        const answer = await this.ormRepository.findOne({ where: { id } });

        return answer;
    }

    public async findByQuestionId(question_id: string): Promise<Answer[] | undefined> {
        const answer = await this.ormRepository.find({ where: { question_id } });


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
