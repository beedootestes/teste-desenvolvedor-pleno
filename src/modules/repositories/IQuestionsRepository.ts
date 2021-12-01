import { Question } from "@modules/infra/typeorm/entities/Question";
import { ICreateQuestionDTO } from "../dtos/ICreateQuestionDTO";


interface IQuestionsRepository{
    create(questionData: ICreateQuestionDTO): Promise<Question>;
    findByTitle(title: string): Promise<Question | undefined >;
    findById(id: string): Promise<Question | undefined>;
    find(): Promise<Question[] | undefined>;
    save(question: Question): Promise<Question>;
    delete(id: string): Promise<void>;
}

export { IQuestionsRepository }
