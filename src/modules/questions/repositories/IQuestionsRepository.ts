import { ICreateQuestionDTO } from "../dtos/ICreateQuestionDTO";
import { Question } from "../infra/typeorm/entities/Question";


interface IQuestionsRepository{
    create(questionData: ICreateQuestionDTO): Promise<Question>;
    findByTitle(title: string): Promise<Question | undefined >;
    findById(id: string): Promise<Question | undefined>;
    find(): Promise<Question[] | undefined>;
    save(question: Question): Promise<Question>;
    delete(id: string): Promise<void>;


}

export { IQuestionsRepository }
