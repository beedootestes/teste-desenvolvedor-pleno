import { v4 as uuid } from 'uuid';
import { ICreateAnswerDTO } from '@modules/questions/dtos/ICreateAnswerDTO';
import { IAnswersRepository } from '../IAnswersRepository';
import { Answer } from '@modules/questions/infra/typeorm/entities/Answers';


class AnswersRepositoryInMemory implements IAnswersRepository {
    
    answers: Answer[] = [];
    
    public async create(answerData: ICreateAnswerDTO): Promise<Answer> {
        const answer = new Answer();
    
        Object.assign(answer, { id: uuid() }, answerData);
    
        this.answers.push(answer);

    
        return answer;
      }

    async find(): Promise<Answer[]>{
        const all = this.answers;

        return all;
    }
    
    async findResgistredAnswerByQuestionId(title: string, question_id: string): Promise<Answer | undefined> {
        
        const answer = this.answers.find((answer) => answer.title === title && answer.question_id === question_id);
        
        return answer;
        
    };

    async findById(id: string): Promise<Answer | undefined> {
        
        const answer = this.answers.find((answer) => answer.id === id);
        
        return answer;
        
    };
    
    public async delete(id: string): Promise<any> {
        this.answers = this.answers.filter(answer => answer.id !== id);
    
        return this.answers;
      }
    
    public async save(answer: Answer): Promise<Answer> {
        const findIndex = this.answers.findIndex(findAnswer => findAnswer.id === answer.id);
    
        this.answers[findIndex] = answer;
    
        return answer;
      }
    };

    
    
    
    export { AnswersRepositoryInMemory };
    