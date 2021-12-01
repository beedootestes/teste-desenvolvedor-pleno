import { ICreateAnswerDTO } from "../dtos/ICreateAnswerDTO";
import { Answer } from "../infra/typeorm/entities/Answers";


interface IAnswersRepository{
    create(answerData: ICreateAnswerDTO): Promise<Answer>;
    findResgistredAnswerByQuestionId(title: string, question_id: string): Promise<Answer | undefined >;
    findById(id: string): Promise<Answer | undefined>;
    find(): Promise<Answer[] | undefined>;
    findByQuestionId(question_id: string): Promise<Answer[] | undefined>;
    save(answer: Answer): Promise<Answer>;
    delete(id: string): Promise<void>;


}

export { IAnswersRepository }
