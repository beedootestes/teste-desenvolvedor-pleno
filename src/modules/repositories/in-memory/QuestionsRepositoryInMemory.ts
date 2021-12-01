import { v4 as uuid } from 'uuid';
import { ICreateQuestionDTO } from "@modules/dtos/ICreateQuestionDTO";
import { IQuestionsRepository } from "../IQuestionsRepository";
import { AnswersRepositoryInMemory } from './AnswersRepositoryInMemory';
import { Question } from '@modules/infra/typeorm/entities/Question';

const answersRepositoryInMemory = new AnswersRepositoryInMemory();

class QuestionsRepositoryInMemory implements IQuestionsRepository {

    questions: Question[] = [];
    
    public async create(questionData: ICreateQuestionDTO): Promise<Question> {
        const question = new Question();
    
        Object.assign(question, { id: uuid() }, questionData);
    
        this.questions.push(question);

    
        return question;
      }

    async find(): Promise<Question[] | any>{

        const newQuestions = [];

        for (const questionList of this.questions) {
            const answers = await answersRepositoryInMemory.findByQuestionId(questionList.id)

            const question = {
                ...questionList, 
                answers
            }


            newQuestions.push(question);
        }
        
      

        return newQuestions;

    }
    
    async findByTitle(title: string): Promise<Question | undefined> {
        
        const question = this.questions.find((question) => question.title === title);
        
        return question;
        
    };

    async findById(id: string): Promise<Question | undefined> {
        
        const question = this.questions.find((question) => question.id === id);
        
        return question;
        
    };
    
    public async delete(id: string): Promise<any> {
        this.questions = this.questions.filter(question => question.id !== id);
    
        return this.questions;
      }
    
    public async save(question: Question): Promise<Question> {
        const findIndex = this.questions.findIndex(findQuestion => findQuestion.id === question.id);
    
        this.questions[findIndex] = question;
    
        return question;
      }
    };

    
    
    
    export { QuestionsRepositoryInMemory };
    